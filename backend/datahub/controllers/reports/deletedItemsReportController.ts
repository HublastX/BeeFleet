import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getDeletedCarsReport = async (
    req: Request,
    res: Response
) => {
    try {
        const { managerId } = req.query;

        const whereClause = {
            deletedAt: { not: null },
            ...(managerId ? { managerId: String(managerId) } : {}),
        };

        const deletedCars = await prisma.car.findMany({
            where: whereClause,
            include: {
                manager: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                deletedBy: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                deletedAt: "desc",
            },
        });

        return res.status(200).json(deletedCars);
    } catch (error) {
        console.error("Erro ao buscar carros excluídos:", error);
        return res
            .status(500)
            .json({ error: "Erro ao buscar carros excluídos" });
    }
};

export const getDeletedDriversReport = async (req: Request, res: Response) => {
    try {
        const { managerId } = req.query;

        const whereClause = {
            deletedAt: { not: null },
            ...(managerId ? { managerId: String(managerId) } : {}),
        };

        const deletedDrivers = await prisma.driver.findMany({
            where: whereClause,
            include: {
                manager: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                deletedBy: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                deletedAt: "desc",
            },
        });

        return res.status(200).json(deletedDrivers);
    } catch (error) {
        console.error("Erro ao buscar motoristas excluídos:", error);
        return res
            .status(500)
            .json({ error: "Erro ao buscar motoristas excluídos" });
    }
};

export const getDeletedEventsReport = async (req: Request, res: Response) => {
    try {
        const { managerId } = req.query;

        const whereClause = {
            deletedAt: { not: null },
            ...(managerId ? { managerId: String(managerId) } : {}),
        };

        const deletedEvents = await prisma.event.findMany({
            where: whereClause,
            include: {
                manager: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                deletedBy: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                car: {
                    select: {
                        id: true,
                        brand: true,
                        model: true,
                        plate: true,
                    },
                },
                driver: {
                    select: {
                        id: true,
                        name: true,
                        license: true,
                    },
                },
            },
            orderBy: {
                deletedAt: "desc",
            },
        });

        return res.status(200).json(deletedEvents);
    } catch (error) {
        console.error("Erro ao buscar eventos excluídos:", error);
        return res
            .status(500)
            .json({ error: "Erro ao buscar eventos excluídos" });
    }
};

export const getAllDeletedItemsReport = async (req: Request, res: Response) => {
    try {
        const { managerId } = req.query;

        const whereClause = {
            deletedAt: { not: null },
            ...(managerId ? { managerId: String(managerId) } : {}),
        };

        const [deletedCars, deletedDrivers, deletedEvents] = await Promise.all([
            prisma.car.findMany({
                where: whereClause,
                include: {
                    manager: { select: { id: true, name: true, email: true } },
                    deletedBy: {
                        select: { id: true, name: true, email: true },
                    },
                },
                orderBy: { deletedAt: "desc" },
            }),
            prisma.driver.findMany({
                where: whereClause,
                include: {
                    manager: { select: { id: true, name: true, email: true } },
                    deletedBy: {
                        select: { id: true, name: true, email: true },
                    },
                },
                orderBy: { deletedAt: "desc" },
            }),
            prisma.event.findMany({
                where: whereClause,
                include: {
                    manager: { select: { id: true, name: true, email: true } },
                    deletedBy: {
                        select: { id: true, name: true, email: true },
                    },
                    car: {
                        select: {
                            id: true,
                            brand: true,
                            model: true,
                            plate: true,
                        },
                    },
                    driver: { select: { id: true, name: true, license: true } },
                },
                orderBy: { deletedAt: "desc" },
            }),
        ]);

        return res.status(200).json({
            deletedCars,
            deletedDrivers,
            deletedEvents,
            summary: {
                totalDeletedItems:
                    deletedCars.length +
                    deletedDrivers.length +
                    deletedEvents.length,
                totalDeletedCars: deletedCars.length,
                totalDeletedDrivers: deletedDrivers.length,
                totalDeletedEvents: deletedEvents.length,
            },
        });
    } catch (error) {
        console.error("Erro ao buscar itens excluídos:", error);
        return res
            .status(500)
            .json({ error: "Erro ao buscar itens excluídos" });
    }
};
