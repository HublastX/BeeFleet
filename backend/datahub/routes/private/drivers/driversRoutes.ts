import express, { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { createDriver } from "../../../controllers/drivers/createDriver";
import { authenticateManager } from "../../../middlewares/auth";

const driverRoutes: Router = express.Router();

driverRoutes.post(
    "/drivers",
    authenticateManager as (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void,
    createDriver as (req: Request, res: Response) => void
);

export default driverRoutes;
