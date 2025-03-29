import { prisma } from "../../config/prisma";
import { Request, Response } from "express";
import {
    Driver,
    DriverReport,
    CarUsageDetail,
} from "../../schemas/reportInterface";

export const getAllDriversUsageReport = async (req: Request, res: Response) => {
    try {
        const { managerId } = req.query;

        if (!managerId) {
            return res.status(400).json({ error: "Manager ID is required" });
        }

        const drivers: Driver[] = await prisma.driver.findMany({
            where: { managerId: managerId as string },
            include: {
                events: {
                    where: { eventType: "RETURN" },
                    include: { car: true },
                    orderBy: { createdAt: "desc" },
                },
            },
        });

        const driversReport: DriverReport[] = drivers.map((driver) => {
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
                    plate: car.plate,
                    model: car.model,
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
