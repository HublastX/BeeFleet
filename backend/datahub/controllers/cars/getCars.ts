import { prisma } from "../../config/prisma";
import { Request, Response } from "express";

export const getCars = async (
    req: Request,
    res: Response
) => {
    try {
        const { managerId, showDeleted } = req.query;
        const showDeletedParam = showDeleted === "true";

        let whereClause: any = {};

        if (managerId) {
            whereClause.managerId = managerId as string;
        }

        if (!showDeletedParam) {
            whereClause.deletedById = null;
        }

        const cars = await prisma.car.findMany({
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

        const carsWithStatus = cars.map((car) => ({
            ...car,
            displayStatus: car.deletedById
                ? "DELETED"
                : car.status === "AVAILABLE" && car.isAvailable
                ? "AVAILABLE"
                : car.status === "IN_USE"
                ? "IN_USE"
                : "MAINTENANCE",
            deletedByName:
                car.deletedById && car.deletedBy ? car.deletedBy.name : null,
        }));

        return res.status(200).json(carsWithStatus);
    } catch (error) {
        console.error("Erro ao buscar carros:", error);
        return res.status(500).json({ error: "Erro ao buscar carros" });
    }
};
