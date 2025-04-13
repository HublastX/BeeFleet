import { Request, Response } from "express";
import { prisma } from "../../config/prisma";

export const createDriver = async (req: Request, res: Response) => {
    try {
        const { name, phone, license, managerId } = req.body;

        const imagePath = req.file
            ? `/${req.file.path.replace(/\\/g, "/")}`
            : null;

        const driver = await prisma.driver.create({
            data: {
                name,
                phone,
                license,
                managerId,
                image: imagePath,
            },
        });

        res.status(201).json({
            success: true,
            message: "Motorista criado com sucesso",
            data: driver,
        });
    } catch (error: any) {
        console.error("Erro ao criar motorista:", error);
        res.status(500).json({
            success: false,
            message: "Falha ao criar motorista",
            error: error.message,
        });
    }
};
