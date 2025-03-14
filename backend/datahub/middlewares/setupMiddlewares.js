import express from "express";
import cors from "cors";

export function setupMiddlewares(app) {
    app.use(express.json());
    app.use(cors());
}
