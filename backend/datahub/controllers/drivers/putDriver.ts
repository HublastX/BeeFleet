import { prisma } from "../../config/prisma";
import { Request, Response } from "express";
import { updateDriverSchema } from "../../schemas/driverInterface";
import { z } from "zod";

export const putDriver = async (
    req: Request,
    res: Response
) => {
    try {
        const { params, body } = updateDriverSchema.parse({
            params: req.params,
            body: req.body,
        });

        const { id } = params;

        const existingDriver = await prisma.driver.findUnique({
            where: { id },
        });
        if (!existingDriver) {
            return res.status(404).json({
                success: false,
                message: "Motorista não encontrado",
            });
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

        const updatedDriver = await prisma.driver.update({
            where: { id },
            data: updateData,
        });

        res.status(200).json({
            success: true,
            message: "Motorista atualizado com sucesso",
            data: updatedDriver,
        });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                success: false,
                message: "Erro de validação",
                errors: error.format(),
            });
        }

        console.error("Erro ao atualizar motorista:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno ao atualizar motorista",
            error: error.message,
        });
    }
};
