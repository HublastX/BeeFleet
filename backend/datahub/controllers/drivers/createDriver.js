import { prisma } from "../../config/prisma.js";

export const createDriver = async (req, res) => {
    try {
        const { name, phone, license } = req.body;

        if (!name || !phone || !license) {
            return res.status(400).json({
                success: false,
                message:
                    "Missing required fields: name, phone, and license are required",
            });
        }

        const existingDriver = await prisma.driver.findFirst({
            where: { license },
        });

        if (existingDriver) {
            return res.status(400).json({
                success: false,
                message: "Driver with this license already exists",
            });
        }

        const driver = await prisma.driver.create({
            data: {
                name,
                phone,
                license,
                status: "AVAILABLE",
            },
        });

        res.status(201).json({
            success: true,
            message: "Driver created successfully",
            data: driver,
        });
    } catch (error) {
        console.error("Error creating driver:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create driver",
            error: error.message,
        });
    }
};
