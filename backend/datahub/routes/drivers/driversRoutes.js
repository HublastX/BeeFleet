import express from "express";
import { createDriver } from "../../controllers/drivers/createDriver.js";

const driverRoutes = express.Router();

driverRoutes.post("/drivers", createDriver);

export default driverRoutes;
