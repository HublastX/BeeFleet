import { prisma } from "../../config/prisma";
import { Request, Response } from "express";

export const putCar = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { model, color, managerId } = req.body;

        const odometer = req.body.odometer
            ? parseFloat(req.body.odometer)
            : undefined;

        const existingCar = await prisma.car.findUnique({ where: { id } });
        if (!existingCar) {
            return res.status(404).json({ error: "Car not found" });
        }

        const imagePath = req.file
            ? `/${req.file.path.replace(/\\/g, "/")}`
            : undefined;

        const updateData: any = {};
        if (model !== undefined) updateData.model = model;
        if (color !== undefined) updateData.color = color;
        if (odometer !== undefined) updateData.odometer = odometer;
        if (managerId !== undefined) updateData.managerId = managerId;
        if (imagePath !== undefined) updateData.image = imagePath;

        const updatedCar = await prisma.car.update({
            where: { id },
            data: updateData,
        });

        res.status(200).json({
            success: true,
            message: "Car updated successfully",
            data: updatedCar,
        });
    } catch (error: any) {
        console.error("Error updating car:", error);
        res.status(500).json({
            success: false,
            message: "Error updating car",
            error: error.message,
        });
    }
};
