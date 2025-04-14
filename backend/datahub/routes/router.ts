import express, { Router } from "express";

import loginManagerRoute from "./public/loginManagerRoute";
import managerRoutes from "./private/managers/managersRoutes";
import driverRoutes from "./private/drivers/driversRoutes";
import eventRoutes from "./private/events/eventRoutes";
import reportRoutes from "./private/reports/reportRoutes";
import carRoutes from "./private/cars/carsRoutes";

const router: Router = express.Router();

router.use("/", (req, res) => {
    res.send("Olá bom dia , acesse api/docs para documentação com swagger!");
});

router.use(loginManagerRoute);
router.use(managerRoutes);
router.use(driverRoutes);
router.use(eventRoutes);
router.use(reportRoutes);
router.use(carRoutes);

export default router;
