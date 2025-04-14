import express, { Router } from "express";
import { uploadManagerImage } from "../../../config/storage/managerStorage";
import { createManager } from "../../../controllers/managers/createManager";
import {
    getManager,
    getAllManagers,
} from "../../../controllers/managers/getAllManager";
import { putManager } from "../../../controllers/managers/putManager";
import { deleteManager } from "../../../controllers/managers/deleteManager";
import { validate } from "../../../middlewares/validate";
import { managerSchema } from "../../../schemas/managerInterface";
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

export default managerRoutes;
