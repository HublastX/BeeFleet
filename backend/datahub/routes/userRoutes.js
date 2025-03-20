import express from "express";
import { createManager } from "../controllers/userController.js";
import { createCar } from "../controllers/userController.js";
import { createDriver } from "../controllers/userController.js";
//import { createEvent } from "../controllers/userController.js";
import { solicitaCar } from "../controllers/userController.js";
import { aprovarSolicitacao } from "../controllers/userController.js";
import { devolverCarro } from "../controllers/userController.js";

const router = express.Router();

router.post("/managers", createManager);

router.post("/drivers", createDriver);
router.post("/cars", createCar);
router.post("/car-requests", solicitaCar);
//router.post("/events", createEvent);
//router.post("/car-requests/:id/status", aprovcar);
router.patch("/car-requests/:id/approve", aprovarSolicitacao);
router.post("/events/return", devolverCarro);

export default router;
