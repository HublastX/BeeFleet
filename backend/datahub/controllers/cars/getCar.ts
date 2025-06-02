import { prisma } from "../../config/prisma";
import { Request, Response } from "express";

export const getCar = async (
    req: Request,
    res: Response
) => {
    try {
        const { id } = req.params;
        const car = await prisma.car.findUnique({ where: { id}});
        if (!car) {
            return res.status(404).json({ error: "Car not found" });
        }
        res.json(car);
    } catch (error) {
        res.status(500).json({ error: "Error fetching car" });
    }
};
