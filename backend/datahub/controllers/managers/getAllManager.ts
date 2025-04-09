import { prisma } from "../../config/prisma";
import { Request, Response } from "express";

export const getManager = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const manager = await prisma.manager.findUnique({ where: { id } });
        if (!manager) {
            return res.status(404).json({ error: "Manager not found"});
        }
        res.json(manager);
    } catch (error) {
        res.status(500).json({ error: "Error fetching manager"});
    }
};

export const getAllManagers = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const managers = await prisma.manager.findMany({
            include: {
            },
        });

        return res.status(200).json({
            success: true,
            count: managers.length,
            data: managers,
        });
    } catch (error) {
        console.error("Error fetching managers:", error);
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};
