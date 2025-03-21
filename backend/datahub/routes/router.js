import express from "express";
import driverRoutes from "./drivers/driversRoutes.js";
import managerRoutes from "./managers/managersRoutes.js";
import carRoutes from "./cars/carsRoutes.js";

const router = express.Router();

router.use(driverRoutes);
router.use(managerRoutes);
router.use(carRoutes);

export default router;
