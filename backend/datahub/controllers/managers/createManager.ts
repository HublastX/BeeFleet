import { prisma } from "../../config/prisma";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

export const createManager = async (
    req: Request,
    res: Response
) => {
    try {
        const { name, email, password } = req.body;

        const existingManager = await prisma.manager.findUnique({
            where: { email },
        });

        if (existingManager) {
            return res.status(400).json({
                success: false,
                message: "Manager with this email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const imagePath = req.file
            ? `/${req.file.path.replace(/\\/g, "/")}`
            : null;

        const manager = await prisma.manager.create({
            data: {
                name,
                email,
                password: hashedPassword,
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
