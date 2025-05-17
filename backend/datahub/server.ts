import express, { Application } from "express";
import router from "./routes/router";
import { errorHandler } from "./middlewares/errorHandler";
import { PORT_DATAHUB } from "./config/constantes";
import { listRoutes } from "./services/printRoutes/printRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

const app: Application = express();

app.use(
    cors({
        origin: ["http://localhost:5006", "http://localhost:3000", "https://hublast.com", "https://hublast.com/beefleet/api/"], // Add any other origins as needed
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);

// Add these lines to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
        swaggerOptions: {
            persistAuthorization: true,
            tagsSorter: (a, b) => {
                const groupsOrder = ["Auth", "Manager", "Cars", "Drivers"];
                return groupsOrder.indexOf(a) - groupsOrder.indexOf(b);
            },
            operationsSorter: (a, b) => {
                const methodsOrder = ["get", "post", "put", "delete", "patch"];
                const methodCompare =
                    methodsOrder.indexOf(a.get("method")) -
                    methodsOrder.indexOf(b.get("method"));

                if (methodCompare === 0) {
                    return a.get("path").localeCompare(b.get("path"));
                }
                return methodCompare;
            },
        },
    })
);

app.use("/api", router);
app.use("/api/uploads", express.static(path.join(__dirname, "./uploads")));

app.use(errorHandler);

app.listen(PORT_DATAHUB, () => {
    listRoutes(app);

    console.log(`\n **Servidor rodando na porta** >>> ${PORT_DATAHUB}`);
    console.log(`   SERVER: http://localhost:${PORT_DATAHUB}/api`);
    console.log(
        `  Docs com Swagger: http://localhost:${PORT_DATAHUB}/api/docs`
    );
});
