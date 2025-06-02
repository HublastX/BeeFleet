import express, { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { createCar } from "../../../controllers/cars/createCar";
import { getCar } from "../../../controllers/cars/getCar";
import { getAllCars } from "../../../controllers/cars/getAllCar";
import { putCar } from "../../../controllers/cars/putCar";
import { deleteCar } from "../../../controllers/cars/deleteCar";
import { authenticateManager } from "../../../middlewares/auth";
import { CreateCarRequestBody } from "../../../schemas/carInterface";
import { validate } from "../../../middlewares/validate";
import { carSchema, updateCarSchema } from "../../../schemas/carInterface";
import { softDeleteCar } from "../../../controllers/managers/softDeleteController";
import { createImageUploader } from "./../../../config/storage/storage";

export const uploadCarImage = createImageUploader("uploads/cars");

const carRoutes: Router = express.Router();

carRoutes.post(
    "/cars/create",
    authenticateManager as (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void,
    uploadCarImage.single("image"),
    validate(carSchema),
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
    validate(updateCarSchema.shape.params, "params"),
    validate(updateCarSchema.shape.body, "body"),
    putCar as unknown as (req: Request, res: Response) => void
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

carRoutes.patch(
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
export default carRoutes;
