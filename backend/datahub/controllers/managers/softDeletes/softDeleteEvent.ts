import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const softDeleteEvent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { managerId, reason } = req.body;

        if (!id || !managerId) {
            return res.status(400).json({
                error: "ID do evento e ID do gestor são obrigatórios",
            });
        }

        const event = await prisma.event.findUnique({
            where: { id },
            include: {
                driver: true,
                car: true,
            },
        });

        if (!event) {
            return res.status(404).json({ error: "Evento não encontrado" });
        }

        if (event.deletedById) {
            return res.status(400).json({
                error: "Este evento já foi ocultado",
                deletedAt: event.deletedAt,
            });
        }

        const deletedEvent = await prisma.event.update({
            where: { id },
            data: {
                deletedAt: new Date(),
                deletedById: managerId,
                isActive: false,
                status: "CANCELLED",
            },
        });

        const eventInfo = `${event.eventType} - Motorista: ${event.driver.name}, Carro: ${event.car.brand} ${event.car.model}`;
        console.log(
            `Evento ocultado (soft delete): ID=${id}, tipo=${
                event.eventType
            }, deletedById=${managerId}, deletedAt=${new Date()}, reason=${
                reason || "Não informado"
            }`
        );

        return res.status(200).json({
            message: `Evento ${eventInfo} foi ocultado com sucesso e não aparecerá mais nas listagens normais, mas ainda estará visível em relatórios.`,
            success: true,
            eventId: id,
            eventInfo: eventInfo,
            deletedById: managerId,
            deletedAt: deletedEvent.deletedAt,
            canBeRestored: true,
        });
    } catch (error) {
        console.error("Erro ao ocultar evento:", error);
        return res.status(500).json({ error: "Erro ao ocultar evento" });
    }
};
