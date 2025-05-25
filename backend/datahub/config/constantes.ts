import { config } from "dotenv";

config();

export const DATABASE_URL: string = process.env.DATABASE_URL || "";
export const PORT_DATAHUB: number = parseInt(
    process.env.PORT_DATAHUB || "5004",
    10
);
export const SECRET_KEY: string = process.env.JWT_SECRET || "chave-secreta";
export const BOT_SERVICE_URL: string =
    process.env.BOT_SERVICE_URL || "http://localhost:8000";
