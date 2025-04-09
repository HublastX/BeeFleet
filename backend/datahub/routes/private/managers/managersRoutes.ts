import express, { Router } from "express";
import { createManager } from "../../../controllers/managers/createManager";
import { getManager } from "../../../controllers/managers/getAllManager";
import { deleteManager } from "../../../controllers/managers/deleteManager";

const managerRoutes: Router = express.Router();

managerRoutes.post("/managers/create", async (req, res, next) => {
    try {
        await createManager(req, res);
    } catch (error) {
        next(error);
    }
});

managerRoutes.get("/managers/:id", async (req, res, next) => {
    try {
        await getManager(req, res);
    } catch (error) {
        next(error);
    }
});

managerRoutes.delete("/managers/:id", async (req, res, next) => {
    try {
        await deleteManager(req, res);
    } catch (error) {
        next(error);
    }
});

export default managerRoutes;
