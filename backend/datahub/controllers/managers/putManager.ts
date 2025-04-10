import { prisma } from "../../config/prisma";
import { Request, Response } from "express";

export const putManager = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const existingManager = await prisma.manager.findUnique({ where: { id }});
        if (!existingManager) {
            return res.status(404).json({ error: "Manager not found" });
        }

        const updatedManagar = await prisma.manager.update({
            where: { id },
            data: {
                name,
            },
        });

        res.json(updatedManagar);

    } catch (error) {
        res.status(500).json({ error: "Error updating manager"});
    }
}
