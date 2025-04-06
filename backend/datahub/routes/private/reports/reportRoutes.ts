import express, { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { authenticateManager } from "../../../middlewares/auth";
import { getVehicleUsageReport } from "../../../controllers/reports/getVehicleUsageReport";
import { getDriverUsageReport } from "../../../controllers/reports/getDriverUsageReport";
import { getAllCarsUsageReport } from "../../../controllers/reports/getAllCarsUsageReport";
import { getAllDriversUsageReport } from "../../../controllers/reports/getAllDriversUsageReport";

const reportRoutes: Router = express.Router();

reportRoutes.get(
    "/report/vehicle-usage",
    authenticateManager as (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void,
    (req: Request, res: Response) => getVehicleUsageReport(req, res)
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

export default reportRoutes;
