import { prisma } from "../../config/prisma.js";
import { SECRET_KEY } from "../../config/constantes.js";
import jwt from "jsonwebtoken";

export const loginManager = async (req, res) => {
    const { email, password } = req.body;

    try {
        const manager = await prisma.manager.findUnique({
            where: { email },
        });

        if (!manager || manager.password !== password) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }

        const token = jwt.sign(
            { id: manager.id, email: manager.email },
            SECRET_KEY,
            { expiresIn: "1m" }
        );

        res.json({ message: "Login bem-sucedido", token, manager });
    } catch (error) {
        res.status(500).json({ error: "Erro no servidor" });
    }
};
