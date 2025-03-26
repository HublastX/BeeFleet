import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/constantes.js";

export const authenticateManager = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res
            .status(401)
            .json({ error: "Acesso negado, token não fornecido" });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: "Token inválido" });
    }
};
