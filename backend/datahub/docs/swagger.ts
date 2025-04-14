import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "BeeFleet API",
            version: "1.0.0",
        },

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },

        security: [
            {
                bearerAuth: [],
            },
        ],
        "x-tagGroups": [
            {
                name: "1. Autenticação",
                tags: ["Auth"],
            },
            {
                name: "2. Gestores",
                tags: ["Manager"],
            },
            {
                name: "3. Veículos",
                tags: ["Cars"],
            },
            {
                name: "4. Motoristas",
                tags: ["Drivers"],
            },
        ],
    },
    apis: [path.join(__dirname, "./**/*.ts")],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
