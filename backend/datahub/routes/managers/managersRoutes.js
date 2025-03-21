import express from "express";
import { createManager } from "../../controllers/managers/createManager.js";

const managerRoutes = express.Router();

managerRoutes.post("/managers", createManager);

export default managerRoutes;
