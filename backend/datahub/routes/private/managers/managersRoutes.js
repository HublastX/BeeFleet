import express from "express";
import { createManager } from "../../../controllers/managers/createManager.js";

const managerRoutes = express.Router();

managerRoutes.post("/managers/create", createManager);

export default managerRoutes;
