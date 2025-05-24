import express, { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { authenticateManager } from "../../../middlewares/auth";
import { getCarUsageReport } from "../../../controllers/reports/getCarUsageReport";
import { getDriverUsageReport } from "../../../controllers/reports/getDriverUsageReport";
import { getAllCarsUsageReport } from "../../../controllers/reports/getAllCarsUsageReport";
import { getAllDriversUsageReport } from "../../../controllers/reports/getAllDriversUsageReport";
import { getAllEventsReport } from "../../../controllers/reports/getAllEventsReport";
import { getAllManagersReport } from "../../../controllers/reports/getAllManagersReport";
import { getCompleteManagersReport } from "../../../controllers/reports/getCompleteManagersReport";
import {
    softDeleteCar,
    softDeleteDriver,
    softDeleteEvent,
    restoreDeletedItem,
} from "../../../controllers/managers/softDeleteController";

const reportRoutes: Router = express.Router();

reportRoutes.get(
    "/report/car-usage",
    authenticateManager as (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void,
    (req: Request, res: Response) => getCarUsageReport(req, res)
);

reportRoutes.get(
    "/report/driver-usage",
    authenticateManager as (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void,
    (req: Request, res: Response) => getDriverUsageReport(req, res)
);

reportRoutes.get(
    "/report/all-cars",
    authenticateManager as (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void,
    async (req: Request, res: Response) => {
        try {
            await getAllCarsUsageReport(req, res);
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" });
        }
    }
);

reportRoutes.get(
    "/report/all-drivers",
    authenticateManager as (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void,
    async (req: Request, res: Response) => {
        try {
            await getAllDriversUsageReport(req, res);
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" });
        }
    }
);

reportRoutes.get(
    "/report/all-events",
    authenticateManager as (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void,
    async (req: Request, res: Response) => {
        try {
            await getAllEventsReport(req, res);
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" });
        }
    }
);

reportRoutes.get(
    "/report/all-managers",
    authenticateManager as (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void,
    async (req: Request, res: Response) => {
        try {
            await getAllManagersReport(req, res);
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" });
        }
    }
);

reportRoutes.get(
    "/report/complete-report",
    authenticateManager as (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void,
    async (req: Request, res: Response) => {
        try {
            await getCompleteManagersReport(req, res);
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" });
        }
    }
);

reportRoutes.patch(
    "/car/:id/soft-delete",
    authenticateManager as (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void,
    async (req: Request, res: Response) => {
        try {
            await softDeleteCar(req, res);
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" });
        }
    }
);

reportRoutes.patch(
    "/driver/:id/soft-delete",
    authenticateManager as (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void,
    async (req: Request, res: Response) => {
        try {
            await softDeleteDriver(req, res);
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" });
        }
    }
);

reportRoutes.patch(
    "/event/:id/soft-delete",
    authenticateManager as (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void,
    async (req: Request, res: Response) => {
        try {
            await softDeleteEvent(req, res);
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" });
        }
    }
);

reportRoutes.patch(
    "/restore/:itemType/:itemId",
    authenticateManager as (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void,
    async (req: Request, res: Response) => {
        try {
            await restoreDeletedItem(req, res);
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" });
        }
    }
);

export default reportRoutes;
