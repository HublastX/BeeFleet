import { prisma } from "../../config/prisma.js";

export const createCar = async (req, res) => {
    const { plate, model, year, managerId } = req.body;
    try {
        const car = await prisma.car.create({
            data: { plate, model, year, managerId },
        });
        res.json(car);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
