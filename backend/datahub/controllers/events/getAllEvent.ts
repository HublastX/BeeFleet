import { prisma } from "../../config/prisma";
import { Request, Response } from "express";

export const getEvent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const event = await prisma.event.findUnique({ where: { id } });
        if (!event) {
            return res.status(404).json({ error: "Evento não encontrado" });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar evento" });
    }
}

export const getAllEvents = async (req: Request, res: Response): Promise<Response> => {
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
