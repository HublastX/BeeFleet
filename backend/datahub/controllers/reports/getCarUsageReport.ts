import { prisma } from "../../config/prisma";
import { EventType } from "@prisma/client";
import { parseISO } from "date-fns";
import {
    CarUsageReportRequest,
    CarUsage,
    CarReport,
    DriverUsageDetail,
    Car,
    CarUsageReportResponse,
} from "../../schemas/reportInterface";

export const getCarUsageReport = async (
    req,
    res
) => {
    try {
        const { startDate, endDate, carId, managerId } =
            req.query as CarUsageReportRequest;

        if (!startDate || !endDate) {
            return res
                .status(400)
                .json({ error: "Start and end dates are required" });
        }

        const parsedStartDate = parseISO(startDate);
        const parsedEndDate = parseISO(endDate);

        const whereCondition = {
            managerId,
            eventType: { equals: "RETURN" as const },
            createdAt: {
                gte: parsedStartDate,
                lte: parsedEndDate,
            },
            ...(carId && { carId }),
        };

        const events = await prisma.event.findMany({
            where: whereCondition,
            include: {
                car: true,
                driver: true,
                manager: true,
            },
            orderBy: {
                createdAt: "asc",
            },
        });

        const carsMap = new Map<
            string,
            Omit<CarUsage, "drivers"> & { drivers: Set<string> }
        >();

        events.forEach((event) => {
            if (carsMap.has(event.carId)) {
                const car = carsMap.get(event.carId)!;
                car.usageCount++;
                car.drivers.add(event.driverId);
                car.totalOdometer += event.odometer;
            } else {
                carsMap.set(event.carId, {
                    carId: event.carId,
                    renavam: event.car.renavam,
                    chassis: event.car.chassis,
                    plate: event.car.plate,
                    brand: event.car.brand,
                    model: event.car.model,
                    year: event.car.year,
                    color: event.car.color,
                    status: event.car.status,
                    usageCount: 1,
                    drivers: new Set([event.driverId]),
                    totalOdometer: event.odometer,
                });
            }
        });

        let cars: Car[];

        if (carId) {
            const car = await prisma.car.findUnique({
                where: { id: carId },
                include: {
                    events: {
                        where: { eventType: "RETURN" },
                        include: { driver: true },
                        orderBy: { createdAt: "desc" },
                    },
                },
            });

            if (!car) {
                return res.status(404).json({ error: "Car not found" });
            }

            cars = [car];
        } else {
            cars = await prisma.car.findMany({
                where: { managerId: managerId as string },
                include: {
                    events: {
                        where: { eventType: "RETURN" },
                        include: { driver: true },
                        orderBy: { createdAt: "desc" },
                    },
                },
            });
        }

        const carReport: CarReport[] = cars.map((car) => {
            const totalUsageTimes = car.events.length;

            const uniqueDrivers = new Set(
                car.events.map((event) => event.driver.id)
            );

            const totalOdometerChange = car.events.reduce((acc, event) => {
                return acc + event.odometer;
            }, 0);

            const lastUsed =
                car.events.length > 0 ? car.events[0].createdAt : null;

            const driverUsageDetails: DriverUsageDetail[] = Array.from(
                uniqueDrivers
            ).map((driverId) => {
                const driverEvents = car.events.filter(
                    (event) => event.driver.id === driverId
                );
                const driver = driverEvents[0].driver;

                return {
                    driverId: driver.id,
                    name: driver.name,
                    phone: driver.phone,
                    license: driver.license,
                    totalUsageTimes: driverEvents.length,
                    totalOdometerChange: driverEvents.reduce(
                        (acc, event) => acc + event.odometer,
                        0
                    ),
                };
            });

            return {
                id: car.id,
                renavam: car.renavam,
                chassis: car.chassis,
                plate: car.plate,
                brand: car.brand,
                model: car.model,
                year: car.year,
                color: car.color,
                status: car.status,
                totalUsageTimes,
                uniqueDriversUsed: uniqueDrivers.size,
                totalOdometerChange,
                lastUsed,
                driverUsageDetails,
            };
        });

        const carsArray: CarUsage[] = Array.from(carsMap.values()).map(
            (car) => ({
                ...car,
                drivers: Array.from(car.drivers),
            })
        );

        const report: CarUsageReportResponse = {
            totalEvents: events.length,
            cars: carsArray,
            startDate: parsedStartDate,
            endDate: parsedEndDate,
        }

        res.json({
            car: carReport[0],
        });
    } catch (error) {
        console.error("Car usage report error:", error);
        res.status(500).json({ error: error.message });
    }
};
