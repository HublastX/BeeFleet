import { prisma } from "../../config/prisma.js";

export const createCheckoutEvent = async (req, res) => {
    try {
        const { managerId, driverId, carId, odometer } = req.body;

        const car = await prisma.car.findUnique({
            where: { id: carId },
        });

        if (!car) {
            return res.status(404).json({
                success: false,
                message: "Car not found",
            });
        }

        if (car.status !== "AVAILABLE") {
            return res.status(400).json({
                success: false,
                message: "Car is not available",
            });
        }

        const driver = await prisma.driver.findUnique({
            where: { id: driverId },
        });

        if (!driver) {
            return res.status(404).json({
                success: false,
                message: "Driver not found",
            });
        }

        if (driver.status !== "AVAILABLE") {
            return res.status(400).json({
                success: false,
                message: "Driver is not available",
            });
        }

        const manager = await prisma.manager.findUnique({
            where: { id: managerId },
        });

        if (!manager) {
            return res.status(404).json({
                success: false,
                message: "Manager not found",
            });
        }

        const result = await prisma.$transaction([
            prisma.car.update({
                where: { id: carId },
                data: {
                    status: "BUSY",
                    odometer: odometer,
                },
            }),

            prisma.driver.update({
                where: { id: driverId },
                data: {
                    status: "BUSY",
                },
            }),

            prisma.event.create({
                data: {
                    eventType: "CHECKOUT",
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

        const event = result[2];

        res.status(201).json({
            success: true,
            message: "Checkout event created successfully",
            data: event,
        });
    } catch (error) {
        console.error("Error creating checkout event:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create checkout event",
            error: error.message,
        });
    }
};
