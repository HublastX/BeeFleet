import { prisma } from "../../config/prisma";
import { Request, Response } from "express";

export const deleteCar = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const car = await prisma.car.delete({ where: { id } });
        if (!car) {
            return res.status(404).json({ error: "Car not found" });
        }
        res.json({
            messager: "Car deleted successfully",
            data: car,
        });
    } catch (error) {
        res.status(500).json({error: "Error deleting car" });
    }
};
