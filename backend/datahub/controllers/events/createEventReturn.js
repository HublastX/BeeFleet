import { prisma } from "../../config/prisma.js";

export const createReturnEvent = async (req, res) => {
    try {
        const { managerId, driverId, carId, odometer } = req.body;

        const checkoutEvent = await prisma.event.findFirst({
            where: {
                carId,
                driverId,
                eventType: "CHECKOUT",
                returnedAt: null,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        if (!checkoutEvent) {
            return res.status(404).json({
                success: false,
                message: "No active checkout found for this car and driver",
            });
        }

        if (odometer < checkoutEvent.odometer) {
            return res.status(400).json({
                success: false,
                message:
                    "Return odometer value must be greater than or equal to checkout odometer value",
            });
        }

        const result = await prisma.$transaction([
            prisma.car.update({
                where: { id: carId },
                data: {
                    status: "AVAILABLE",
                    odometer: odometer,
                },
            }),

            prisma.driver.update({
                where: { id: driverId },
                data: {
                    status: "AVAILABLE",
                },
            }),

            prisma.event.update({
                where: { id: checkoutEvent.id },
                data: {
                    returnedAt: new Date(),
                },
            }),

            prisma.event.create({
                data: {
                    eventType: "RETURN",
                    odometer,
                    managerId,
                    driverId,
                    carId,
                },
                include: {
                    car: true,
                    driver: true,
                    manager: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            }),
        ]);

        const returnEvent = result[3];

        res.status(201).json({
            success: true,
            message: "Return event created successfully",
            data: returnEvent,
        });
    } catch (error) {
        console.error("Error creating return event:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create return event",
            error: error.message,
        });
    }
};
