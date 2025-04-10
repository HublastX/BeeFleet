import { prisma } from "../../config/prisma";
import { Request, Response } from "express";

export const putDriver = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email, phone, managerId } = req.body;

        const existingDriver = await prisma.driver.findUnique({ where: { id } });
        if (!existingDriver) {
            return res.status(404).json({ error: "Driver not found" });
        }

        const updatedDriver = await prisma.driver.update({
            where: { id },
            data: {
                name,
                phone,
                managerId,
            },
        });

        res.json(updatedDriver);

    } catch (error) {
        res.status(500).json({ error: "Error updating driver" });
    }
}
