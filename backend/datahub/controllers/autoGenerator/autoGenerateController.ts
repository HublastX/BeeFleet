import { Request, Response, NextFunction } from "express";
import {
    scheduleAutoGeneration,
    runImmediateGeneration,
} from "../../services/autoGenerator/autoGenerateService";

export const setupAutoGeneration = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const {
            managerId = "965edb48-eaae-45f6-b47c-18aa537fac14",
            carCount = 5,
            driverCount = 3,
            eventCount = 4,
        } = req.body;

        scheduleAutoGeneration(managerId, carCount, driverCount, eventCount);

        res.status(200).json({
            success: true,
            message:
                "Auto-generation scheduled successfully. Will run daily at 10:00 AM.",
            data: {
                managerId,
                carCount,
                driverCount,
                eventCount,
                schedule: "34 21 * * *",
            },
        });
    } catch (error: any) {
        console.error("Error setting up auto-generation:", error);
        res.status(500).json({
            success: false,
            message: "Failed to set up auto-generation",
            error: error.message,
        });
    }
};

export const triggerImmediateGeneration = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const {
            managerId = "965edb48-eaae-45f6-b47c-18aa537fac14",
            carCount = 5,
            driverCount = 3,
            eventCount = 4,
        } = req.body;

        const result = await runImmediateGeneration(
            managerId,
            carCount,
            driverCount,
            eventCount
        );

        res.status(200).json({
            success: true,
            message: "Auto-generation completed successfully",
            data: {
                cars: result.cars.length,
                drivers: result.drivers.length,
                events: {
                    checkouts: result.events.checkouts.length,
                    returns: result.events.returns.length,
                },
                managerId,
            },
        });
    } catch (error: any) {
        console.error("Error running immediate generation:", error);
        res.status(500).json({
            success: false,
            message: "Failed to run immediate generation",
            error: error.message,
        });
    }
};
