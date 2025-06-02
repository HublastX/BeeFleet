import { prisma } from "../../config/prisma";
import { Request, Response } from "express";

export const getAllEvents = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const events = await prisma.event.findMany({
            include: {},
        });

        return res.status(200).json({
            success: true,
            count: events.length,
            data: events,
        });
    } catch (error) {
        console.error("Error fetching events:", error);
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
}
