import express, { Router } from "express";
import {
    setupAutoGeneration,
    triggerImmediateGeneration,
} from "../../../controllers/autoGenerator/autoGenerateController";
import { authenticateManager } from "../../../middlewares/auth";

const router: Router = express.Router();

router.post("/auto-generator/setup", authenticateManager, setupAutoGeneration);
router.post(
    "/auto-generator/generate-now",
    authenticateManager,
    triggerImmediateGeneration
);

export default router;
