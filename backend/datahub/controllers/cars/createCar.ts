import { prisma } from "../../config/prisma";
import { Request, Response } from "express";
import { CreateCarRequestBody } from "../../schemas/carInterface";

export const createCar = async (
    req: Request<{}, {}, CreateCarRequestBody>,
    res: Response
) => {
    try {
        const { plate, model, year, color, managerId } = req.body;
        const car = await prisma.car.create({
            data: { plate, model, year, color, managerId },
        });
        res.json(car);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
