import express, { Router } from "express";
import { createCar } from "../../../controllers/cars/createCar";
import { Request, Response, NextFunction } from "express";
import { authenticateManager } from "../../../middlewares/auth";
const carRoutes: Router = express.Router();

carRoutes.post(
    "/cars/create",
    authenticateManager as (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void,
    createCar
);

export default carRoutes;
