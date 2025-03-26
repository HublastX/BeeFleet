import express from "express";

import { loginManager } from "../../controllers/managers/loginManager.js";

const managerRoutes = express.Router();

managerRoutes.post("/managers/login", loginManager);

export default managerRoutes;
