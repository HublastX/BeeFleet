import { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import { DriverData } from "../../schemas/driverInterface";

export const createDriver = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { name, phone, license, managerId }: DriverData = req.body;

        if (!name || !phone || !license || !managerId) {
            res.status(400).json({
                success: false,
                message:
                    "Missing required fields: name, phone, license, and managerId are required",
            });
            return;
        }

        const driver = await prisma.driver.create({
            data: {
                name,
                phone,
                license,
                managerId,
            },
        });

        res.status(201).json({
            success: true,
            message: "Driver created successfully",
            data: driver,
        });
    } catch (error: any) {
        console.error("Error creating driver:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create driver",
            error: error.message,
        });
    }
};
