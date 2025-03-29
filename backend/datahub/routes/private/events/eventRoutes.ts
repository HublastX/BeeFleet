import express, { Router } from "express";
import { createEvent } from "../../../controllers/events/createEvent";
import { Request, Response, NextFunction } from "express";
import { authenticateManager } from "../../../middlewares/auth";
const eventRoutes: Router = express.Router();

eventRoutes.post(
    "/events/checkout",
    authenticateManager as (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void,
    (req: Request, res: Response) => {
        createEvent(req, res);
    }
);

export default eventRoutes;
