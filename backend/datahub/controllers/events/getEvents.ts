import { prisma } from "../../config/prisma";
import { Request, Response } from "express";

export const getEvents = async (req: Request, res: Response) => {
    try {
        const { managerId, showDeleted } = req.query;
        const showDeletedParam = showDeleted === "true";

        let whereClause: any = {};

        // Filtrar por gestor se informado
        if (managerId) {
            whereClause.managerId = managerId as string;
        }

        // Por padrão, excluir os "deletados" a menos que showDeleted seja true
        if (!showDeletedParam) {
            whereClause.deletedById = null;
        }

        const events = await prisma.event.findMany({
            where: whereClause,
            include: {
                manager: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                driver: {
                    select: {
                        id: true,
                        name: true,
                        license: true,
                        phone: true,
                    },
                },
                car: {
                    select: {
                        id: true,
                        brand: true,
                        model: true,
                        plate: true,
                        color: true,
                    },
                },
                deletedBy: showDeletedParam
                    ? {
                          select: {
                              id: true,
                              name: true,
                              email: true,
                          },
                      }
                    : undefined,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        // Adicionar informação visual de status para cada evento
        const eventsWithStatus = events.map((event) => ({
            ...event,
            displayStatus: event.deletedById
                ? "DELETED"
                : event.status === "PENDING"
                ? "PENDING"
                : event.status === "ACTIVE"
                ? "ACTIVE"
                : event.status === "COMPLETED"
                ? "COMPLETED"
                : "CANCELLED",
            // Adicionar nome do gestor que excluiu, se aplicável
            deletedByName:
                event.deletedById && event.deletedBy
                    ? event.deletedBy.name
                    : null,
            // Adicionar informações formatadas do carro e motorista
            driverInfo: event.driver
                ? `${event.driver.name} (${event.driver.license})`
                : "N/A",
            carInfo: event.car
                ? `${event.car.brand} ${event.car.model} (${event.car.plate})`
                : "N/A",
        }));

        return res.status(200).json(eventsWithStatus);
    } catch (error) {
        console.error("Erro ao buscar eventos:", error);
        return res.status(500).json({ error: "Erro ao buscar eventos" });
    }
};
