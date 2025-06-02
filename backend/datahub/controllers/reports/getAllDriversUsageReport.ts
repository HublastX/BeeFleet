import { prisma } from "../../config/prisma";
import { Request, Response } from "express";
import {
    Driver,
    DriverReport,
    CarUsageDetail,
} from "../../schemas/reportInterface";

export const getAllDriversUsageReport = async (
    req: Request,
    res: Response
) => {
    try {
        const drivers: Driver[] = await prisma.driver.findMany({
            include: {
                events: {
                    where: {
                        eventType: {
                            in: ["CHECKOUT", "RETURN", "REPAIR_RETURN"]
                        }
                    },
                    include: { car: true },
                    orderBy: { createdAt: "asc" },
                },
            },
        });

        const driversReport: DriverReport[] = drivers.map((driver) => {
            const relevantEvents = driver.events.filter(event =>
                event.eventType === "RETURN" || event.eventType === "REPAIR_RETURN"
            );

            const totalUsageTimes = relevantEvents.length;

            const uniqueCars = new Set(
                relevantEvents.map((event) => event.car.id)
            );

            const totalOdometerChange = driver.events.length >= 2
                ? driver.events[driver.events.length - 1].odometer - driver.events[0].odometer
                : 0;

            const lastUsed =
                relevantEvents.length > 0 ? relevantEvents[relevantEvents.length - 1].createdAt : null;

            const carUsageDetails: CarUsageDetail[] = Array.from(uniqueCars).map((carId) => {
                const carEvents = driver.events.filter(
                    (event) => event.car.id === carId
                );

                const sortedCarEvents = carEvents.sort(
                    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                );

                const carOdometerChange = sortedCarEvents.length >= 2
                    ? sortedCarEvents[sortedCarEvents.length - 1].odometer -
                      sortedCarEvents[0].odometer
                    : 0;

                const car = sortedCarEvents[0].car;

                const usageTimes = carEvents.filter(
                    (e) => e.eventType === "RETURN" || e.eventType === "REPAIR_RETURN"
                ).length;

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
                    usageTimes,
                    totalOdometerChange: carOdometerChange,
                };
            });

            return {
                id: driver.id,
                name: driver.name,
                phone: driver.phone,
                license: driver.license,
                createdAt: driver.createdAt,
                totalUsageTimes,
                uniqueCarsUsed: uniqueCars.size,
                totalOdometerChange,
                lastUsed,
                carUsageDetails,
            };
        });

        res.json({
            totalDrivers: driversReport.length,
            drivers: driversReport,
        });
    } catch (error) {
        console.error("All Drivers Usage Report error:", error);
        res.status(500).json({ error: error.message });
    }
};
