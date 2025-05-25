import express, { Router } from "express";

import loginManagerRoute from "./public/loginManagerRoute";
import managerRoutes from "./private/managers/managersRoutes";
import driverRoutes from "./private/drivers/driversRoutes";
import eventRoutes from "./private/events/eventRoutes";
import reportRoutes from "./private/reports/reportRoutes";
import carRoutes from "./private/cars/carsRoutes";
import botRoutes from "./public/bot/botRoutes";

const router: Router = express.Router();

router.use(loginManagerRoute);
router.use(managerRoutes);
router.use(driverRoutes);
router.use(eventRoutes);
router.use(reportRoutes);
router.use(carRoutes);
router.use(botRoutes);

export default router;
