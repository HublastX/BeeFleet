import { prisma } from "../config/prisma.js";
import { hash } from "bcrypt";

export const createManager = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: "MANAGER",
            },
        });

        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar gestor" });
    }
};
