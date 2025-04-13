import { prisma } from "../../config/prisma";
import { Request, Response } from "express";

export const putDriver = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, phone, license, managerId } = req.body;

        const existingDriver = await prisma.driver.findUnique({
            where: { id },
        });
        if (!existingDriver) {
            return res.status(404).json({
                success: false,
                message: "Driver not found",
            });
        }

        const imagePath = req.file
            ? `/${req.file.path.replace(/\\/g, "/")}`
            : undefined;

        const updateData: any = {};
        if (name !== undefined) updateData.name = name;
        if (phone !== undefined) updateData.phone = phone;
        if (license !== undefined) updateData.license = license;
        if (managerId !== undefined) updateData.managerId = managerId;
        if (imagePath !== undefined) updateData.image = imagePath;

        const updatedDriver = await prisma.driver.update({
            where: { id },
            data: updateData,
        });

        res.status(200).json({
            success: true,
            message: "Driver updated successfully",
            data: updatedDriver,
        });
    } catch (error: any) {
        console.error("Error updating driver:", error);
        res.status(500).json({
            success: false,
            message: "Error updating driver",
            error: error.message,
        });
    }
};
