import { prisma } from "../../config/prisma";
import { parseISO } from "date-fns";
import {
    VehicleUsageReportRequest,
    VehicleUsageReportResponse,
    VehicleUsage,
} from "../../schemas/reportInterface";

export const getVehicleUsageReport = async (req, res) => {
    try {
        const { startDate, endDate, carId, managerId } =
            req.query as VehicleUsageReportRequest;

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

        const report: VehicleUsageReportResponse = {
            totalEvents: events.length,
            vehicles: events.reduce<VehicleUsage[]>((acc, event) => {
                const existingVehicle = acc.find(
                    (v) => v.carId === event.carId
                );
                if (existingVehicle) {
                    existingVehicle.usageCount++;
                    existingVehicle.totalOdometer += event.odometer;
                } else {
                    acc.push({
                        carId: event.carId,
                        plate: event.car.plate,
                        model: event.car.model,
                        usageCount: 1,
                        totalOdometer: event.odometer,
                    });
                }
                return acc;
            }, []),
            startDate: parsedStartDate,
            endDate: parsedEndDate,
        };

        res.json(report);
    } catch (error) {
        console.error("Vehicle usage report error:", error);
        res.status(500).json({ error: error.message });
    }
};
