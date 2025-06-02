import { prisma } from "../../config/prisma";
import { Request, Response } from "express";

export const getDriver = async (
    req: Request,
    res: Response
) => {
    try {
        const { id } = req.params;
        const driver = await prisma.driver.findUnique({ where: { id } });
        if (!driver) {
            return res.status(404).json({ error: "Driver not found" });
        }
        res.json(driver);
    } catch (error) {
        res.status(500).json({ error: "Error fetching driver" });
    }
};
