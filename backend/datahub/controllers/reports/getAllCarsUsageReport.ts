import { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import { CarUsageReport } from "../../schemas/reportInterface";

export const getAllCarsUsageReport = async (req: Request, res: Response) => {
    try {
        const { managerId } = req.query;

        if (!managerId || typeof managerId !== "string") {
            return res
                .status(400).json({ error: "Manager ID is required and must be a string" });
        }

        const cars = await prisma.car.findMany({
            where: { managerId },
            include: {
                events: {
                    where: { eventType: "RETURN" },
                    orderBy: { createdAt: "desc" },
                },
            },
        });

        const carsReport: CarUsageReport[] = cars.map((car) => {
            const totalUsageTimes = car.events.length;

            const totalOdometerChange = car.events.reduce((acc, event) => {
                return acc + event.odometer;
            }, 0);

            const lastUsed =
                car.events.length > 0 ? car.events[0].createdAt : null;

            const averageDailyUsage =
                totalUsageTimes > 0
                    ? (totalOdometerChange / totalUsageTimes).toFixed(2)
                    : 0;

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
                totalOdometerChange,
                lastUsed,
                averageDailyUsage,
                currentOdometer: car.odometer,
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
