import { prisma } from "../../config/prisma";
import { Request, Response } from "express";

export const getCar = async (req: Request, res: Response) => {
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

export const getAllCars = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const cars = await prisma.car.findMany({
            include: {
                manager: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });

        return res.status(200).json({
            success: true,
            count: cars.length,
            data: cars,
        });
    } catch (error) {
        console.error("Error fetching cars:", error);
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};
