import { prisma } from "../../config/prisma.js";

export const createManager = async (req, res) => {
    const { name, email, password, phone } = req.body;
    try {
        const manager = await prisma.manager.create({
            data: { name, email, password, phone },
        });
        res.json(manager);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
