import express from "express";
import cors from "cors";
import { NextHandleFunction } from "connect";

export function setupMiddlewares(app: {
    use: (arg0: NextHandleFunction) => void;
}) {
    app.use(express.json());
    app.use(cors());
}
