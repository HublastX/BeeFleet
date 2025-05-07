import { prisma } from "../../config/prisma";
import { Request, Response } from "express";

export const getAllDrivers = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const drivers = await prisma.driver.findMany({
            include: {
                manager: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });

        return res.status(200).json({
            success: true,
            count: drivers.length,
            data: drivers,
        });
    } catch (error) {
        console.error("Error fetching drivers:", error);
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};
