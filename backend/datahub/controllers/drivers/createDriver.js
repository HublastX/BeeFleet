import { prisma } from "../../config/prisma.js";

export const createDriver = async (req, res) => {
    const { name, cpf, driverLicense, phone } = req.body;
    try {
        const driver = await prisma.driver.create({
            data: { name, cpf, driverLicense, phone },
        });
        res.json(driver);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
