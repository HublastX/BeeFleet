import { z } from "zod";

export const managerSchema = z.object({
    name: z
        .string()
        .min(1, { message: "Name is required" })
        .regex(/^\s*\S+\s+\S+.*$/, {
            message: "Name must contain at least two words",
        }),
    email: z.string().email({ message: "Invalid email" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" }),
});

export interface LoginRequestBody {
    email: string;
    password: string;
}
