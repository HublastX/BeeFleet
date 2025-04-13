import { prisma } from "../../config/prisma";
import { Request, Response } from "express";

export const createManager = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message:
                    "Missing required fields: name, email, and password are required",
            });
        }

        const existingManager = await prisma.manager.findUnique({
            where: { email },
        });

        if (existingManager) {
            return res.status(400).json({
                success: false,
                message: "Manager with this email already exists",
            });
        }

        const imagePath = req.file
            ? `/${req.file.path.replace(/\\/g, "/")}`
            : null;
        console.log("Uploaded file:", req.file);
        console.log("Image path:", imagePath);

        const manager = await prisma.manager.create({
            data: {
                name,
                email,
                password: password, // Consider hashing this password
                image: imagePath,
            },
        });

        const { password: _, ...secureManager } = manager;

        res.status(201).json({
            success: true,
            message: "Manager created successfully",
            data: secureManager,
        });
    } catch (error: any) {
        console.error("Error creating manager:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create manager",
            error: error.message,
        });
    }
};
