import { prisma } from "../../config/prisma";
import { differenceInHours } from "date-fns";
import { Request, Response } from "express";
import {
    CreateEventRequestBody,
    EventStatus,
    CarStatus,
} from "../../schemas/eventInterface";

export const createEvent = async (
    req: Request<{}, {}, CreateEventRequestBody>,
    res: Response
): Promise<void> => {
    try {
        const {
            eventType,
            odometer,
            managerId,
            driverId,
            carId,
            checkoutEventId,
        } = req.body;

        if (eventType === "CHECKOUT") {
            const car = await prisma.car.findUnique({
                where: { id: carId },
            });

            if (!car) {
                res.status(404).json({ error: "Car not found" });
                return;
            }

            if (!car.isAvailable || car.status !== "AVAILABLE") {
                res.status(400).json({
                    error: "Car is not available for checkout",
                });
                return;
            }

            const driver = await prisma.driver.findUnique({
                where: { id: driverId },
            });

            if (!driver) {
                res.status(404).json({ error: "Driver not found" });
                return;
            }

            if (!driver.isAvailable) {
                res.status(400).json({
                    error: "Driver is not available for checkout",
                });
                return;
            }

            const event = await prisma.event.create({
                data: {
                    eventType,
                    odometer,
                    managerId,
                    driverId,
                    carId,
                    status: "ACTIVE" as EventStatus,
                },
            });

            await prisma.car.update({
                where: { id: carId },
                data: {
                    status: "IN_USE" as CarStatus,
                    isAvailable: false,
                },
            });

            await prisma.driver.update({
                where: { id: driverId },
                data: {
                    isAvailable: false,
                },
            });

            res.json(event);
        } else if (eventType === "RETURN") {
            if (!checkoutEventId) {
                res.status(400).json({
                    error: "Checkout event ID is required",
                });
                return;
            }

            const checkoutEvent = await prisma.event.findFirst({
                where: {
                    id: checkoutEventId,
                    eventType: "CHECKOUT",
                },
            });

            if (!checkoutEvent) {
                res.status(404).json({ error: "Checkout event not found" });
                return;
            }

            if (
                checkoutEvent.carId !== carId ||
                checkoutEvent.driverId !== driverId
            ) {
                res.status(400).json({
                    error: "Return event does not match original checkout event",
                });
                return;
            }

            const returnEvent = await prisma.event.create({
                data: {
                    eventType: "RETURN",
                    odometer,
                    managerId,
                    driverId,
                    carId,
                    checkoutEventId,
                    status: "COMPLETED" as EventStatus,
                    endedAt: new Date(),
                },
            });

            await prisma.event.update({
                where: { id: checkoutEventId },
                data: {
                    status: "COMPLETED" as EventStatus,
                    endedAt: new Date(),
                },
            });

            const duration = differenceInHours(
                new Date(),
                checkoutEvent.createdAt
            );

            const report = await prisma.report.create({
                data: {
                    managerId,
                    driverId,
                    carId,
                    eventType: "RETURN",
                    startDate: checkoutEvent.createdAt,
                    endDate: new Date(),
                },
            });

            await prisma.car.update({
                where: { id: carId },
                data: {
                    status: "AVAILABLE" as CarStatus,
                    isAvailable: true,
                },
            });

            await prisma.driver.update({
                where: { id: driverId },
                data: {
                    isAvailable: true,
                },
            });

            res.json({
                event: returnEvent,
                report,
                duration: `${duration} hours`,
            });
        } else {
            res.status(400).json({ error: "Invalid event type" });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
