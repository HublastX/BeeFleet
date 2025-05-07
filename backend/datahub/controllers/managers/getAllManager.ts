import { prisma } from "../../config/prisma";
import { Request, Response } from "express";

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
