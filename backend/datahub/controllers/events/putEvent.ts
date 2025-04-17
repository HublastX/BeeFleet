import { prisma } from "../../config/prisma";
import { Request, Response } from "express";

export const putEvent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const body = req.body;

        const existingEvent = await prisma.event.findUnique({ where: { id } });
        if (!existingEvent) {
            return res.status(404).json({ error: "Event not found" });
        }

        const imagePath = req.file
            ? `/${req.file.path.replace(/\\/g, "/")}`
            : undefined;

        const updateData: any = {
            ...body,
            ...(imagePath && { image: imagePath }),
        };

        Object.keys(updateData).forEach(
            (key) => updateData[key] === undefined && delete updateData[key]
        );

        const updatedEvent = await prisma.event.update({
            where: { id },
            data: updateData,
        });

        res.status(200).json({
            success: true,
            message: "Event updated successfully",
            data: updatedEvent,
        });
    } catch (error: any) {
        console.error("Error updating event:", error);
        res.status(500).json({
            success: false,
            message: "Error updating event",
            error: error.message,
        });
    }
}
