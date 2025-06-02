import { prisma } from "../../config/prisma";
import { Request, Response } from "express";

export const getEvent = async (
    req: Request,
    res: Response
) => {
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
