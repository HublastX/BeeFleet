import { prisma } from "../../config/prisma";
import { Request, Response } from "express";
import { CreateCarRequestBody } from "../../schemas/carInterface";

export const createCar = async (
    req: Request<{}, {}, CreateCarRequestBody>,
    res: Response
) => {
    try {
        const { renavam, chassis, plate, brand, model, year, color, odometer, managerId } = req.body;

        const plateExists = await prisma.car.findUnique({
            where: { plate },
        });

        if (plateExists) {
            return res.status(409).json({
                success: false,
                message: "Placa já está cadastrada",
            });
        }

        const imagePath = req.file
            ? `/${req.file.path.replace(/\\/g, "/")}`
            : null;

        const car = await prisma.car.create({
            data: {
                renavam,
                chassis,
                plate,
                brand,
                model,
                year,
                color,
                odometer,
                managerId,
                image: imagePath,
            },
        });

        res.status(201).json({
            success: true,
            message: "Carro criado com sucesso",
            data: car,
        });
    } catch (error: any) {
        console.error("Erro ao criar carro:", error);
        res.status(500).json({
            success: false,
            message: "Falha ao criar carro",
            error: error.message,
        });
    }
};
