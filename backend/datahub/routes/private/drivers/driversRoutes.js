import express from "express";
import { createDriver } from "../../../controllers/drivers/createDriver.js";
import { authenticateManager } from "../../../middlewares/auth.js";

const driverRoutes = express.Router();

driverRoutes.post("/drivers", authenticateManager, createDriver);

export default driverRoutes;
