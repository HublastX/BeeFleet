import express, { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { createDriver } from "../../../controllers/drivers/createDriver";
import { getDriver } from "../../../controllers/drivers/getAllDriver";
import { getAllDrivers } from "../../../controllers/drivers/getAllDriver";
import { deleteDriver } from "../../../controllers/drivers/deleteDriver";

import { authenticateManager } from "../../../middlewares/auth";

const driverRoutes: Router = express.Router();

driverRoutes.post(
    "/drivers/create",
    authenticateManager as (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void,
    createDriver as (req: Request, res: Response) => void
);

driverRoutes.get(
    "/drivers/:id",
    authenticateManager as (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void,
    getDriver as (req: Request, res: Response) => void
);

driverRoutes.get(
    "/drivers",
    authenticateManager as (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void,
    getAllDrivers as (req: Request, res: Response) => void
);

driverRoutes.delete(
    "/drivers/:id",
    authenticateManager as (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void,
    deleteDriver as (req: Request, res: Response) => void
);

export default driverRoutes;
