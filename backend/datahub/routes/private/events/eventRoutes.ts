import express, { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { createEvent } from "../../../controllers/events/createEvent";
import { getEvent } from "../../../controllers/events/getEvent";
import { getAllEvents } from "../../../controllers/events/getAllEvent";
import { putEvent } from "../../../controllers/events/putEvent";
import { deleteEvent } from "../../../controllers/events/deleteEvent";
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

eventRoutes.get(
    "/events/checkout/:id",
    authenticateManager as (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void,
    getEvent as (req: Request, res: Response) => void
);

eventRoutes.get(
    "/events/checkout",
    authenticateManager as (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void,
    getAllEvents as (req: Request, res: Response) => void
);

eventRoutes.put(
    "/events/checkout/:id",
    authenticateManager as (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void,
    putEvent as (req: Request, res: Response) => void
);

eventRoutes.delete(
    "/events/checkout/:id",
    authenticateManager as (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void,
    deleteEvent as (req: Request, res: Response) => void
);

export default eventRoutes;
