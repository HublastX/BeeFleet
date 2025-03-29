import express, { Router } from "express";
import { createManager } from "../../../controllers/managers/createManager";

const managerRoutes: Router = express.Router();

managerRoutes.post("/managers/create", async (req, res, next) => {
    try {
        await createManager(req, res);
    } catch (error) {
        next(error);
    }
});

export default managerRoutes;
