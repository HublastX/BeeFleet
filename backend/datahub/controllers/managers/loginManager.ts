import { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import { SECRET_KEY } from "../../config/constantes";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { LoginRequestBody, Manager } from "../../schemas/managerInterface";

export const loginManager = async (
    req: Request<unknown, unknown, LoginRequestBody>,
    res: Response
): Promise<void> => {
    const { email, password } = req.body;

    try {
        const manager: Manager | null = await prisma.manager.findUnique({
            where: { email },
        });

        if (!manager) {
            res.status(401).json({ error: "Credenciais inválidas" });
            return;
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            manager.password
        );
        if (!isPasswordValid) {
            res.status(401).json({ error: "Credenciais inválidas" });
            return;
        }

        const token = jwt.sign(
            { id: manager.id, email: manager.email },
            SECRET_KEY,
            { expiresIn: "30d" }
        );

        res.json({ message: "Login bem-sucedido", token, manager });
    } catch (error) {
        res.status(500).json({ error: "Erro no servidor" });
    }
};
