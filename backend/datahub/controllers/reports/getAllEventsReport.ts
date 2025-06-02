import { prisma } from "../../config/prisma";
import { Request, Response } from "express";
import {
    EventReport
} from "../../schemas/reportInterface";

export const getAllEventsReport = async (
    req: Request,
    res: Response
) => {
    try {
        const events = await prisma.event.findMany({
            include: {
                driver: true,
                car: true,
            },
            orderBy: { createdAt: "desc" },
        });

        const eventsReport: EventReport[] = events.map((event) => {
            return {
                id: event.id,
                eventType: event.eventType,
                odometer: event.odometer,
                isActive: event.isActive,
                status: event.status,
                createdAt: event.createdAt,
                endedAt: event.endedAt,
                managerId: event.managerId,
                driverId: event.driver.id,
                carId: event.car.id,
                checkoutEventId: event.checkoutEventId || null,
                driverDetails: {
                    name: event.driver?.name,
                    phone: event.driver?.phone,
                    license: event.driver?.license,
                },
                carDetails: {
                    renavam: event.car?.renavam,
                    chassis: event.car?.chassis,
                    plate: event.car?.plate,
                    brand: event.car?.brand,
                    model: event.car?.model,
                    year: event.car?.year,
                    color: event.car?.color,
                    status: event.car?.status,
                },
            };
        });

        res.json({
            totalEvents: events.length,
            events: eventsReport});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
