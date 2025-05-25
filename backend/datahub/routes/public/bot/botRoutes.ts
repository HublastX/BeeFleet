import express, { Router } from "express";
import { Request, Response } from "express";
import { BOT_SERVICE_URL } from "../../../config/constantes";

const botRoutes: Router = express.Router();

botRoutes.post("/message", async (req: Request, res: Response) => {
    try {
        const { message } = req.body;

        if (!message) {
            res.status(400).json({ error: "Message is required" });
            return;
        }

        const response = await fetch(
            `${BOT_SERVICE_URL}/?question=${encodeURIComponent(message)}`
        );

        if (!response.ok) {
            throw new Error(
                `Bot service responded with status: ${response.status}`
            );
        }

        const botResponse = await response.json();

        res.status(200).json(botResponse);
    } catch (error: any) {
        console.error("Error communicating with bot service:", error);
        res.status(500).json({
            error: "Failed to communicate with the bot service",
            details: error.message,
        });
    }
});

export default botRoutes;
