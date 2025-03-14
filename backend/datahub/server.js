import express from "express";
import userRoutes from "./routes/userRoutes.js";
import { setupMiddlewares } from "./middlewares/setupMiddlewares.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { PORT_DATAHUB } from "./config/constantes.js";

const app = express();

// Configuração dos middlewares
setupMiddlewares(app);

// Rotas da API
app.use("/api", userRoutes);

// Middleware de tratamento de erros
app.use(errorHandler);

// Inicialização do servidor
app.listen(PORT_DATAHUB, () => {
    console.log(`Servidor rodando na porta ${PORT_DATAHUB}`);
});
