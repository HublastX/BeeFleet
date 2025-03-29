import express, { Application } from "express";
import router from "./routes/router";
import { setupMiddlewares } from "./middlewares/setupMiddlewares";
import { errorHandler } from "./middlewares/errorHandler";
import { PORT_DATAHUB } from "./config/constantes";
import { listRoutes } from "./services/printRoutes/printRoutes";

const app: Application = express();

setupMiddlewares(app);

app.use("/api", router);

app.use(errorHandler);

app.listen(PORT_DATAHUB, () => {
    listRoutes(app);

    console.log(`\n **Servidor rodando na porta** >>> ${PORT_DATAHUB}`);
    console.log(`   **http://localhost:${PORT_DATAHUB}**`);
});
