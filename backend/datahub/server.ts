import express, { Application } from "express";
import router from "./routes/router";
import { setupMiddlewares } from "./middlewares/setupMiddlewares";
import { errorHandler } from "./middlewares/errorHandler";
import { PORT_DATAHUB } from "./config/constantes";
import { listRoutes } from "./services/printRoutes/printRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger";

const app: Application = express();

setupMiddlewares(app);

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

app.use(errorHandler);

app.listen(PORT_DATAHUB, () => {
    listRoutes(app);

    console.log(`\n **Servidor rodando na porta** >>> ${PORT_DATAHUB}`);
    console.log(`   SERVER: http://localhost:${PORT_DATAHUB}/api`);
    console.log(
        `  Docs com Swagger: http://localhost:${PORT_DATAHUB}/api/docs`
    );
});
