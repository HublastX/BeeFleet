import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const restoreDeletedItem = async (req: Request, res: Response) => {
    try {
        const { itemType, itemId } = req.params;
        const { managerId } = req.body;

        if (!itemType || !itemId || !managerId) {
            return res.status(400).json({
                error: "Tipo de item, ID do item e ID do gestor são obrigatórios",
            });
        }

        let result;
        let message;

        switch (itemType) {
            case "car":
                result = await prisma.car.update({
                    where: { id: itemId },
                    data: {
                        deletedAt: null,
                        deletedById: null,
                        isAvailable: true,
                    },
                    include: {
                        manager: {
                            select: {
                                name: true,
                            },
                        },
                    },
                });
                message = `Carro ${result.brand} ${result.model} (${result.plate}) foi restaurado com sucesso e agora aparecerá nas listagens normais.`;
                break;

            case "driver":
                result = await prisma.driver.update({
                    where: { id: itemId },
                    data: {
                        deletedAt: null,
                        deletedById: null,
                        isAvailable: true,
                    },
                });
                message = `Motorista ${result.name} foi restaurado com sucesso e agora aparecerá nas listagens normais.`;
                break;

            case "event":
                result = await prisma.event.update({
                    where: { id: itemId },
                    data: {
                        deletedAt: null,
                        deletedById: null,
                    },
                    include: {
                        driver: true,
                        car: true,
                    },
                });
                message = `Evento foi restaurado com sucesso e agora aparecerá nas listagens normais.`;
                break;

            case "manager":
                const admin = await prisma.manager.findUnique({
                    where: { id: managerId },
                });

                if (!admin || !admin.isAdmin) {
                    return res.status(403).json({
                        error: "Apenas administradores podem restaurar gestores",
                    });
                }

                result = await prisma.manager.update({
                    where: { id: itemId },
                    data: {
                        deletedAt: null,
                        deletedById: null,
                    },
                });
                message = `Gestor ${result.name} foi restaurado com sucesso e agora aparecerá nas listagens normais.`;
                break;

            default:
                return res.status(400).json({
                    error: "Tipo de item inválido. Deve ser 'car', 'driver', 'event' ou 'manager'",
                });
        }

        console.log(
            `Item restaurado: Tipo=${itemType}, ID=${itemId}, managerId=${managerId}`
        );

        return res.status(200).json({
            message,
            success: true,
            itemType,
            itemId,
            restoredById: managerId,
            restoredAt: new Date(),
        });
    } catch (error) {
        console.error("Erro ao restaurar item:", error);
        return res.status(500).json({ error: "Erro ao restaurar item" });
    }
};
