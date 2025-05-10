import express from "express";
import cors from "cors";
import { NextHandleFunction } from "connect";

export function setupMiddlewares(app: {
    use: (arg0: NextHandleFunction) => void;
}) {
    app.use(express.json());
    app.use(
        cors({
            origin: ["http://localhost:5004", "https://hublast.com"],
            methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
            credentials: true,
        })
    );
}
