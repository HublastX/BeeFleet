import express from "express";

import loginManagerRoute from "./public/loginManagerRoute.js";
import managerRoutes from "./private/managers/managersRoutes.js";
import driversRoutes from "./private/drivers/driversRoutes.js";

const router = express.Router();

router.use(loginManagerRoute);
router.use(managerRoutes);
router.use(driversRoutes);

export default router;
