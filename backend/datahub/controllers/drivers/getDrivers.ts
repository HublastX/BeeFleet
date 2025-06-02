import { prisma } from "../../config/prisma";
import { Request, Response } from "express";

export const getDrivers = async (
    req: Request,
    res: Response
) => {
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

        const drivers = await prisma.driver.findMany({
            where: whereClause,
            include: {
                manager: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
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

        // Adicionar informação visual de status para cada motorista
        const driversWithStatus = drivers.map((driver) => ({
            ...driver,
            displayStatus: driver.deletedById
                ? "DELETED"
                : driver.isAvailable
                ? "AVAILABLE"
                : "UNAVAILABLE",
            // Adicionar nome do gestor que excluiu, se aplicável
            deletedByName:
                driver.deletedById && driver.deletedBy
                    ? driver.deletedBy.name
                    : null,
        }));

        return res.status(200).json(driversWithStatus);
    } catch (error) {
        console.error("Erro ao buscar motoristas:", error);
        return res.status(500).json({ error: "Erro ao buscar motoristas" });
    }
};
