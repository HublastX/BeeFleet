import { prisma } from "../../config/prisma";
import { Request, Response } from "express";
import {
    Car,
    CarReport,
    DriverUsageDetail,
} from "../../schemas/reportInterface";

export const getAllCarsUsageReport = async (req: Request, res: Response) => {
    try {
        const cars: Car[] = await prisma.car.findMany({
            include: {
                events: {
                    where: {
                        eventType: {
                            in: ["CHECKOUT", "RETURN", "REPAIR_RETURN"]
                        }
                    },
                    include: { driver: true },
                    orderBy: { createdAt: "asc" }, // ordena do mais antigo ao mais novo
                },
            },
        });

        const carsReport: CarReport[] = cars.map((car) => {
            const relevantEvents = car.events.filter(event =>
                event.eventType === "RETURN" || event.eventType === "REPAIR_RETURN"
            );

            const totalUsageTimes = relevantEvents.length;

            const uniqueDrivers = new Set(
                relevantEvents.map((event) => event.driver.id)
            );

            const totalOdometerChange = car.events.length >= 2
                ? car.events[car.events.length - 1].odometer - car.events[0].odometer
                : 0;

            const lastUsed =
                relevantEvents.length > 0 ? relevantEvents[relevantEvents.length - 1].createdAt : null;

            const driverUsageDetails: DriverUsageDetail[] = Array.from(
                uniqueDrivers
            ).map((driverId) => {
                const driverEvents = car.events.filter(
                    (event) => event.driver.id === driverId
                );

                const sortedDriverEvents = driverEvents.sort(
                    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                );

                const driverOdometerChange = sortedDriverEvents.length >= 2
                    ? sortedDriverEvents[sortedDriverEvents.length - 1].odometer -
                      sortedDriverEvents[0].odometer
                    : 0;

                const driver = driverEvents[0].driver;

                return {
                    driverId: driver.id,
                    name: driver.name,
                    phone: driver.phone,
                    license: driver.license,
                    totalUsageTimes: driverEvents.filter(
                        (event) => event.eventType === "RETURN" || event.eventType === "REPAIR_RETURN"
                    ).length,
                    totalOdometerChange: driverOdometerChange,
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
                createdAt: car.createdAt,
                totalUsageTimes,
                totalOdometerChange,
                uniqueDriversUsed: uniqueDrivers.size,
                lastUsed,
                driverUsageDetails,
            };
        });

        res.json({
            totalCars: carsReport.length,
            cars: carsReport,
        });
    } catch (error: any) {
        console.error("All Cars Usage Report error:", error);
        res.status(500).json({ error: error.message });
    }
};
