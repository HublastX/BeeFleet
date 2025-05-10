import { prisma } from "../../config/prisma";
import { Request, Response } from "express";

export const deleteManager = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const managerExists = await prisma.manager.findUnique({
            where: { id },
        });

        if (!managerExists) {
            return res.status(404).json({ error: "Manager not found" });
        }

        const deletedManager = await prisma.$transaction(async (tx) => {
            await tx.event.deleteMany({ where: { managerId: id } });

            await tx.report.deleteMany({ where: { managerId: id } });

            await tx.driver.deleteMany({ where: { managerId: id } });

            await tx.car.deleteMany({ where: { managerId: id } });

            return tx.manager.delete({ where: { id } });
        });

        res.json({
            message: "Manager and all associated data deleted successfully",
            data: deletedManager,
        });
    } catch (error) {
        console.error("Error deleting manager:", error);
        res.status(500).json({
            error: "Error deleting manager",
            details: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
