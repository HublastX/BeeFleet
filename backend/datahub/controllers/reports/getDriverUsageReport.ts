import { prisma } from "../../config/prisma";
import { EventType } from "@prisma/client";
import { parseISO } from "date-fns";
import {
    DriverUsageReportRequest,
    DriverUsage,
    DriverReport,
    CarUsageDetail,
    Driver,
    DriverUsageReport,
} from "../../schemas/reportInterface";

export const getDriverUsageReport = async (
    req,
    res
) => {
    try {
        const { startDate, endDate, driverId, managerId } =
            req.query as DriverUsageReportRequest;

        if (!startDate || !endDate) {
            return res
                .status(400)
                .json({ error: "Start and end dates are required" });
        }

        const parsedStartDate = parseISO(startDate);
        const parsedEndDate = parseISO(endDate);

        const whereCondition = {
            managerId,
            eventType: { equals: "RETURN" as EventType },
            createdAt: {
                gte: parsedStartDate,
                lte: parsedEndDate,
            },
            ...(driverId && { driverId }),
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

        const driversMap = new Map<
            string,
            Omit<DriverUsage, "cars"> & { cars: Set<string> }
        >();

        events.forEach((event) => {
            if (driversMap.has(event.driverId)) {
                const driver = driversMap.get(event.driverId)!;
                driver.usageCount++;
                driver.cars.add(event.carId);
                driver.totalOdometer += event.odometer;
            } else {
                driversMap.set(event.driverId, {
                    driverId: event.driverId,
                    name: event.driver.name,
                    phone: event.driver.phone,
                    usageCount: 1,
                    cars: new Set([event.carId]),
                    totalOdometer: event.odometer,
                });
            }
        });

        let drivers: Driver[];

        if (driverId) {
            const driver = await prisma.driver.findUnique({
                where: { id: driverId },
                include: {
                    events: {
                        where: { eventType: "RETURN" },
                        include: { car: true },
                        orderBy: { createdAt: "desc" },
                    },
                },
            });

            if (!driver) {
                return res.status(404).json({ error: "Driver not found" });
            }

            drivers = [driver];
        } else {
            drivers = await prisma.driver.findMany({
                where: { managerId: managerId as string },
                include: {
                    events: {
                        where: { eventType: "RETURN" },
                        include: { car: true },
                        orderBy: { createdAt: "desc" },
                    },
                },
            });
        }


        const driverReport: DriverReport[] = drivers.map((driver) => {
            const totalUsageTimes = driver.events.length;

            const uniqueCars = new Set(
                driver.events.map((event) => event.car.id)
            );

            const totalOdometerChange = driver.events.reduce((acc, event) => {
                return acc + event.odometer;
            }, 0);

            const lastUsed =
                driver.events.length > 0 ? driver.events[0].createdAt : null;

            const carUsageDetails: CarUsageDetail[] = Array.from(
                uniqueCars
            ).map((carId) => {
                const carEvents = driver.events.filter(
                    (event) => event.car.id === carId
                );
                const car = carEvents[0].car;

                return {
                    carId: car.id,
                    renavam: car.renavam,
                    chassis: car.chassis,
                    plate: car.plate,
                    brand: car.brand,
                    model: car.model,
                    year: car.year,
                    color: car.color,
                    status: car.status,
                    usageTimes: carEvents.length,
                    totalOdometerChange: carEvents.reduce(
                        (acc, event) => acc + event.odometer,
                        0
                    ),
                };
            });

            return {
                id: driver.id,
                name: driver.name,
                phone: driver.phone,
                license: driver.license,
                totalUsageTimes,
                uniqueCarsUsed: uniqueCars.size,
                totalOdometerChange,
                lastUsed,
                carUsageDetails,
            }
        });

        const driversArray: DriverUsage[] = Array.from(driversMap.values()).map(
            (driver) => ({
                ...driver,
                cars: Array.from(driver.cars),
            })
        );

        const report: DriverUsageReport = {
            totalEvents: events.length,
            drivers: driversArray,
        }

        res.json({
            driver: driverReport[0],
        });
    } catch (error) {
        console.error("Driver Usage Report error:", error);
        res.status(500).json({ error: error.message });
    }
};
