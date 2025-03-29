import express, { Router } from "express";

import { loginManager } from "../../controllers/managers/loginManager.js";

const managerRoutes: Router = express.Router();

managerRoutes.post("/managers/login", loginManager);

export default managerRoutes;
