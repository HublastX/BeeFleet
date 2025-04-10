import { prisma } from "../../config/prisma";
import { Request, Response } from "express";

export const putCar = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { model, color, managerId } = req.body;

        const existingCar = await prisma.car.findUnique({ where: { id }});
        if (!existingCar) {
            return res.status(404).json({ error: "Car not found" });
        }

        const updatedCar = await prisma.car.update({
            where: { id },
            data: {
                model,
                color,
                managerId,
            },
        });

        res.json(updatedCar);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error updating car" });
    }
}
