import { prisma } from "../../config/prisma";
import { Request, Response } from "express";

export const putManager = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        const existingManager = await prisma.manager.findUnique({
            where: { id },
        });

        if (!existingManager) {
            return res.status(404).json({
                success: false,
                message: "Manager not found",
            });
        }

        const imagePath = req.file
            ? `/${req.file.path.replace(/\\/g, "/")}`
            : undefined;

        const updateData: any = {};
        if (name !== undefined) updateData.name = name;
        if (email !== undefined) updateData.email = email;
        if (imagePath !== undefined) updateData.image = imagePath;

        const updatedManager = await prisma.manager.update({
            where: { id },
            data: updateData,
        });

        const { password: _, ...secureManager } = updatedManager;

        res.status(200).json({
            success: true,
            message: "Manager updated successfully",
            data: secureManager,
        });
    } catch (error: any) {
        console.error("Error updating manager:", error);
        res.status(500).json({
            success: false,
            message: "Error updating manager",
            error: error.message,
        });
    }
};
