import express from "express";
import { createManager } from "../controllers/userController.js";

const router = express.Router();

router.post("/gestores", createManager);

export default router;
