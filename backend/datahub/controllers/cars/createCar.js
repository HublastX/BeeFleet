import { prisma } from "../../config/prisma.js";

export const createCar = async (req, res) => {
    try {
        const { plate, model, year, color, odometer } = req.body;

        if (!plate || !model || !year || !color) {
            return res.status(400).json({
                success: false,
                message:
                    "Missing required fields: plate, model, year, and color are required",
            });
        }

        const existingCar = await prisma.car.findUnique({
            where: { plate },
        });

        if (existingCar) {
            return res.status(400).json({
                success: false,
                message: "Car with this plate already exists",
            });
        }

        const car = await prisma.car.create({
            data: {
                plate,
                model,
                year: parseInt(year),
                color,
                odometer: odometer ? parseInt(odometer) : 0,
                status: "AVAILABLE",
            },
        });

        res.status(201).json({
            success: true,
            message: "Car created successfully",
            data: car,
        });
    } catch (error) {
        console.error("Error creating car:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create car",
            error: error.message,
        });
    }
};
