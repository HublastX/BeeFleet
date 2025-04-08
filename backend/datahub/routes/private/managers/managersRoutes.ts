import express, { Router } from "express";
import { createManager } from "../../../controllers/managers/createManager";
import { getManagar } from "../../../controllers/managers/getAllManager";

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
        await getManagar(req, res);
    } catch (error) {
        next(error);
    }
});

export default managerRoutes;
