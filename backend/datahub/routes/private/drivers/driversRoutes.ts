import express, { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { uploadDriverImage } from "../../../config/storage/driverStorage";
import { createDriver } from "../../../controllers/drivers/createDriver";
import { getDriver } from "../../../controllers/drivers/getAllDriver";
import { getAllDrivers } from "../../../controllers/drivers/getAllDriver";
import { putDriver } from "../../../controllers/drivers/putDriver";
import { deleteDriver } from "../../../controllers/drivers/deleteDriver";
import { authenticateManager } from "../../../middlewares/auth";
import { validate } from "../../../middlewares/validate";
import {
    driverSchema,
    updateDriverSchema,
} from "../../../schemas/driverInterface";
const driverRoutes: Router = express.Router();

driverRoutes.post(
    "/drivers/create",
    authenticateManager as (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void,
    uploadDriverImage.single("image"),
    validate(driverSchema, "body"),
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

driverRoutes.put(
    "/drivers/:id",
    authenticateManager as (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void,
    uploadDriverImage.single("image"),
    validate(updateDriverSchema.shape.params, "params"),
    validate(updateDriverSchema.shape.body, "body"),
    putDriver as (req: Request, res: Response) => void
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
