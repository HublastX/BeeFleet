// Updated Car Controller
import { prisma } from "../../config/prisma";
import { Request, Response } from "express";
import { CreateCarRequestBody } from "../../schemas/carInterface";

export const createCar = async (
    req: Request<{}, {}, CreateCarRequestBody>,
    res: Response
) => {
    try {
        const { plate, model, color, managerId } = req.body;

        // Convert string values to appropriate types
        const year = parseInt(req.body.year.toString());
        const odometer = parseFloat(req.body.odometer.toString());

        // Validate required fields
        if (!plate || !model || !year || !color || !managerId) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields for car creation",
            });
        }

        // Validate converted values
        if (isNaN(year) || isNaN(odometer)) {
            return res.status(400).json({
                success: false,
                message:
                    "Year must be a valid integer and odometer must be a valid number",
            });
        }

        // Get image path if file exists
        const imagePath = req.file
            ? `/${req.file.path.replace(/\\/g, "/")}`
            : null;
        console.log("Uploaded file:", req.file); // Debug log
        console.log("Image path:", imagePath); // Debug log

        const car = await prisma.car.create({
            data: {
                plate,
                model,
                year, // Now properly converted to integer
                color,
                odometer, // Now properly converted to float
                managerId,
                image: imagePath,
            },
        });

        res.status(201).json({
            success: true,
            message: "Car created successfully",
            data: car,
        });
    } catch (error: any) {
        console.error("Error creating car:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create car",
            error: error.message,
        });
    }
};
