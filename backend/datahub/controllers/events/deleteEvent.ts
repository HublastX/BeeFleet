import { prisma } from "../../config/prisma";
import { Request, Response } from "express";

export const deleteEvent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const event = await prisma.event.delete({ where: { id } });
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.json({
            message: "Event deleted successfully",
            data: event,
        });
    } catch (error) {
        res.status(500).json({ error: "Error deleting event" });
    }
}
