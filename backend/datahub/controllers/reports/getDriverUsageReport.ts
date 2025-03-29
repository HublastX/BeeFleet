import { EventType } from "@prisma/client";
import { prisma } from "../../config/prisma";
import { parseISO } from "date-fns";

import {
    DriverUsageReportRequest,
    DriverUsage,
    DriverUsageReport,
} from "../../schemas/reportInterface";

export const getDriverUsageReport = async (req, res) => {
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
            Omit<DriverUsage, "vehicles"> & { vehicles: Set<string> }
        >();

        events.forEach((event) => {
            if (driversMap.has(event.driverId)) {
                const driver = driversMap.get(event.driverId)!;
                driver.usageCount++;
                driver.vehicles.add(event.carId);
                driver.totalOdometer += event.odometer;
            } else {
                driversMap.set(event.driverId, {
                    driverId: event.driverId,
                    name: event.driver.name,
                    phone: event.driver.phone,
                    usageCount: 1,
                    vehicles: new Set([event.carId]),
                    totalOdometer: event.odometer,
                });
            }
        });

        const driversArray: DriverUsage[] = Array.from(driversMap.values()).map(
            (driver) => ({
                ...driver,
                vehicles: Array.from(driver.vehicles),
            })
        );

        const report: DriverUsageReport = {
            totalEvents: events.length,
            drivers: driversArray,
        };

        res.json(report);
    } catch (error) {
        console.error("Driver usage report error:", error);
        res.status(500).json({ error: error.message });
    }
};
