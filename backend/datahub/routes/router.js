import express from "express";

import managerRoutes from "./managers/managersRoutes.js";

const router = express.Router();

router.use(managerRoutes);

export default router;
