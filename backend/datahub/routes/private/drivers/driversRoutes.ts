import express, { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { createDriver } from "../../../controllers/drivers/createDriver";
import { getDriver } from "../../../controllers/drivers/getDriver";
import { getAllDrivers } from "../../../controllers/drivers/getAllDriver";
import { putDriver } from "../../../controllers/drivers/putDriver";
import { deleteDriver } from "../../../controllers/drivers/deleteDriver";
import { softDeleteDriver } from "../../../controllers/managers/softDeletes/softDeleteDriver";
import { authenticateManager } from "../../../middlewares/auth";
import { validate } from "../../../middlewares/validate";
import {
    driverSchema,
    updateDriverSchema,
} from "../../../schemas/driverInterface";
import { createImageUploader } from "./../../../config/storage/storage";

export const uploadDriverImage = createImageUploader("uploads/drivers");
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

driverRoutes.patch(
    "/driver/:id/soft-delete",
    authenticateManager as (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void,
    async (req: Request, res: Response) => {
        try {
            await softDeleteDriver(req, res);
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" });
        }
    }
);
export default driverRoutes;
