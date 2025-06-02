import express, { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { createManager } from "../../../controllers/managers/createManager";
import { getManager } from "../../../controllers/managers/getManager";
import { getAllManagers } from "../../../controllers/managers/getAllManager";
import { putManager } from "../../../controllers/managers/putManager";
import { deleteManager } from "../../../controllers/managers/deleteManager";
import { softDeleteManager } from "../../../controllers/managers/softDeletes/softDeleteManager";
import { authenticateManager } from "../../../middlewares/auth";
import { validate } from "../../../middlewares/validate";
import { restoreDeletedItem } from "../../../controllers/managers/softDeletes/restoreDeleteItem";
import { managerSchema } from "../../../schemas/managerInterface";
import { createImageUploader } from "./../../../config/storage/storage";

export const uploadManagerImage = createImageUploader("uploads/managers");
const managerRoutes: Router = express.Router();

managerRoutes.post(
    "/managers/create",
    uploadManagerImage.single("image"),
    validate(managerSchema),

    async (req, res, next) => {
        try {
            await createManager(req, res);
        } catch (error) {
            next(error);
        }
    }
);

managerRoutes.get("/managers/:id", async (req, res, next) => {
    try {
        await getManager(req, res);
    } catch (error) {
        next(error);
    }
});

managerRoutes.get("/managers", async (req, res, next) => {
    try {
        await getAllManagers(req, res);
    } catch (error) {
        next(error);
    }
});

managerRoutes.put(
    "/managers/:id",
    uploadManagerImage.single("image"),
    validate(managerSchema.partial()),
    async (req, res, next) => {
        try {
            await putManager(req, res);
        } catch (error) {
            next(error);
        }
    }
);

managerRoutes.delete("/managers/:id", async (req, res, next) => {
    try {
        await deleteManager(req, res);
    } catch (error) {
        next(error);
    }
});

managerRoutes.patch(
    "/managers/soft-delete/:id",
    authenticateManager as (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void,
    async (req: Request, res: Response) => {
        try {
            await softDeleteManager(req, res);
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" });
        }
    }
);

managerRoutes.patch(
    "/restore/:itemType/:itemId",
    authenticateManager as (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void,
    async (req: Request, res: Response) => {
        try {
            await restoreDeletedItem(req, res);
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" });
        }
    }
);
export default managerRoutes;
