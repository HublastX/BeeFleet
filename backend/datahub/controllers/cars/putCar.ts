import { prisma } from "../../config/prisma";
import { Request, Response } from "express";
import {
    UpdateCarRequestBody,
    UpdateCarRequestParams,
} from "../../schemas/carInterface";

export const putCar = async (
    req: Request<UpdateCarRequestParams, {}, UpdateCarRequestBody>,
    res: Response
) => {
    try {
        const { id } = req.params;
        const body = req.body;

        const existingCar = await prisma.car.findUnique({ where: { id } });
        if (!existingCar) {
            return res.status(404).json({ error: "Car not found" });
        }

        if (body.plate) {
            const plateExists = await prisma.car.findFirst({
                where: {
                    plate: body.plate,
                    NOT: { id },
                },
            });

            if (plateExists) {
                return res.status(409).json({
                    success: false,
                    message: "Essa placa já está em uso por outro veículo",
                });
            }
        }

        const imagePath = req.file
            ? `/${req.file.path.replace(/\\/g, "/")}`
            : undefined;

        const updateData: any = {
            ...body,
            ...(imagePath && { image: imagePath }),
        };

        Object.keys(updateData).forEach(
            (key) => updateData[key] === undefined && delete updateData[key]
        );

        const updatedCar = await prisma.car.update({
            where: { id },
            data: updateData,
        });

        res.status(200).json({
            success: true,
            message: "Car updated successfully",
            data: updatedCar,
        });
    } catch (error: any) {
        console.error("Error updating car:", error);
        res.status(500).json({
            success: false,
            message: "Error updating car",
            error: error.message,
        });
    }
};
