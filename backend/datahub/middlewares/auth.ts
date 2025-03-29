import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/constantes";
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "../schemas/middlewareInterface";

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const authenticateManager = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const token = req.header("Authorization");

    if (!token) {
        res.status(401).json({ error: "Acesso negado, token não fornecido" });
        return;
    }

    try {
        const decoded = jwt.verify(
            token.replace("Bearer ", ""),
            SECRET_KEY
        ) as JwtPayload;
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: "Token inválido" });
    }
};
