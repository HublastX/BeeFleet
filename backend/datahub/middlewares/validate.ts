import { Request, Response, NextFunction } from "express";
import { ZodSchema, AnyZodObject } from "zod";

type ValidationTarget = "body" | "params" | "query";

export const validate =
    (schema: ZodSchema<any>, target: ValidationTarget = "body") =>
    (req: Request, res: Response, next: NextFunction): void => {
        const dataToValidate = req[target];
        const result = schema.safeParse(dataToValidate);

        if (!result.success) {
            res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: result.error.format(),
            });
            return;
        }

        req[target] = result.data;
        next();
    };
