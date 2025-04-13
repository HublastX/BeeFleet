import express, { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { uploadCarImage } from "../../../config/storage/carStorage";
import { createCar } from "../../../controllers/cars/createCar";
import { getCar } from "../../../controllers/cars/getAllCar";
import { getAllCars } from "../../../controllers/cars/getAllCar";
import { putCar } from "../../../controllers/cars/putCar";
import { deleteCar } from "../../../controllers/cars/delete.Car";
import { authenticateManager } from "../../../middlewares/auth";
import { CreateCarRequestBody } from "../../../schemas/carInterface";

const carRoutes: Router = express.Router();

carRoutes.post(
    "/cars/create",
    authenticateManager as (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void,
    uploadCarImage.single("image"),
    createCar as (
        req: Request<{}, {}, CreateCarRequestBody>,
        res: Response
    ) => Promise<void>
);

carRoutes.get(
    "/cars/:id",
    authenticateManager as (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void,
    getCar as (req: Request, res: Response) => void
);

carRoutes.get(
    "/cars",
    authenticateManager as (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void,
    getAllCars as (req: Request, res: Response) => void
);

carRoutes.put(
    "/cars/:id",
    authenticateManager as (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void,
    uploadCarImage.single("image"),
    putCar as (req: Request, res: Response) => void
);

carRoutes.delete(
    "/cars/:id",
    authenticateManager as (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void,
    deleteCar as (req: Request, res: Response) => void
);

export default carRoutes;
