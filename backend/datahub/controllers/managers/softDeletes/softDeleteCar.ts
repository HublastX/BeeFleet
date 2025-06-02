import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const softDeleteCar = async (
    req: Request,
    res: Response
) => {
    try {
        const { id } = req.params;
        const { managerId, reason } = req.body;

        if (!id || !managerId) {
            return res
                .status(400)
                .json({ error: "ID do carro e ID do gestor são obrigatórios" });
        }

        const car = await prisma.car.findUnique({
            where: { id },
            include: {
                manager: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        if (!car) {
            return res.status(404).json({ error: "Carro não encontrado" });
        }

        if (car.deletedById) {
            return res.status(400).json({
                error: "Este carro já foi excluído",
                deletedAt: car.deletedAt,
            });
        }

        const deletedCar = await prisma.car.update({
            where: { id },
            data: {
                deletedAt: new Date(),
                deletedById: managerId,
                isAvailable: false,
                status: "AVAILABLE",
            },
        });

        console.log(
            `Carro ocultado (soft delete): ID=${id}, deletedById=${managerId}, deletedAt=${new Date()}, reason=${
                reason || "Não informado"
            }`
        );

        return res.status(200).json({
            message: `Carro ${car.brand} ${car.model} (${car.plate}) foi ocultado com sucesso e não aparecerá mais nas listagens normais, mas ainda estará visível em relatórios.`,
            success: true,
            carId: id,
            carInfo: `${car.brand} ${car.model} (${car.plate})`,
            deletedById: managerId,
            deletedAt: deletedCar.deletedAt,
            canBeRestored: true,
        });
    } catch (error) {
        console.error("Erro ao ocultar carro:", error);
        return res.status(500).json({ error: "Erro ao ocultar carro" });
    }
};
