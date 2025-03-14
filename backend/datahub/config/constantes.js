import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

export const DATABASE_URL = process.env.DATABASE_URL || "";
export const PORT_DATAHUB = process.env.PORT_DATAHUB || 3009;
