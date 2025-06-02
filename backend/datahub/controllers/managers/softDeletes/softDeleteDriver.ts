import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const softDeleteDriver = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { managerId, reason } = req.body;

        if (!id || !managerId) {
            return res.status(400).json({
                error: "ID do motorista e ID do gestor são obrigatórios",
            });
        }

        const driver = await prisma.driver.findUnique({
            where: { id },
        });

        if (!driver) {
            return res.status(404).json({ error: "Motorista não encontrado" });
        }

        if (driver.deletedById) {
            return res.status(400).json({
                error: "Este motorista já foi ocultado",
                deletedAt: driver.deletedAt,
            });
        }

        const deletedDriver = await prisma.driver.update({
            where: { id },
            data: {
                deletedAt: new Date(),
                deletedById: managerId,
                isAvailable: false,
            },
        });

        console.log(
            `Motorista ocultado (soft delete): ID=${id}, nome=${
                driver.name
            }, deletedById=${managerId}, deletedAt=${new Date()}, reason=${
                reason || "Não informado"
            }`
        );

        return res.status(200).json({
            message: `Motorista ${driver.name} foi ocultado com sucesso e não aparecerá mais nas listagens normais, mas ainda estará visível em relatórios.`,
            success: true,
            driverId: id,
            driverName: driver.name,
            deletedById: managerId,
            deletedAt: deletedDriver.deletedAt,
            canBeRestored: true,
        });
    } catch (error) {
        console.error("Erro ao ocultar motorista:", error);
        return res.status(500).json({ error: "Erro ao ocultar motorista" });
    }
};
