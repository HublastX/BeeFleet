export const DOCS_AUTO_GENERATOR = {
    /**
     * @swagger
     * tags:
     *   - name: AutoGenerator
     *     description: Endpoints para geração automática de carros, motoristas e eventos
     *
     * /api/auto-generator/setup:
     *   post:
     *     tags:
     *       - AutoGenerator
     *     summary: Configura a geração automática diária
     *     description: Configura a geração automática de carros, motoristas e eventos para ocorrer diariamente às 21:30
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: false
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               managerId:
     *                 type: string
     *                 format: uuid
     *                 example: "504580e1-c8d4-4ab1-a2fa-1fb6a22b1bcb"
     *                 description: ID do gestor para associar aos carros e motoristas gerados (opcional)
     *               carCount:
     *                 type: integer
     *                 example: 5
     *                 description: Quantidade de carros a serem gerados diariamente (opcional, padrão é 5)
     *               driverCount:
     *                 type: integer
     *                 example: 3
     *                 description: Quantidade de motoristas a serem gerados diariamente (opcional, padrão é 3)
     *               eventCount:
     *                 type: integer
     *                 example: 4
     *                 description: Quantidade de eventos de checkout a serem gerados diariamente (opcional, padrão é 4, os eventos de return serão metade desse valor)
     *     responses:
     *       200:
     *         description: Geração automática configurada com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 message:
     *                   type: string
     *                   example: "Auto-generation scheduled successfully. Will run daily at 10:00 AM."
     *                 data:
     *                   type: object
     *                   properties:
     *                     managerId:
     *                       type: string
     *                       example: "504580e1-c8d4-4ab1-a2fa-1fb6a22b1bcb"
     *                     carCount:
     *                       type: integer
     *                       example: 5
     *                     driverCount:
     *                       type: integer
     *                       example: 3
     *                     eventCount:
     *                       type: integer
     *                       example: 4
     *                     schedule:
     *                       type: string
     *                       example: "34 21 * * *"
     *       401:
     *         description: Não autorizado (token inválido ou ausente)
     *       500:
     *         description: Erro no servidor
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: false
     *                 message:
     *                   type: string
     *                   example: "Failed to set up auto-generation"
     *                 error:
     *                   type: string
     *                   example: "Error details"
     *
     * /api/auto-generator/generate-now:
     *   post:
     *     tags:
     *       - AutoGenerator
     *     summary: Inicia a geração imediata
     *     description: Gera imediatamente carros, motoristas e eventos conforme os parâmetros especificados
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: false
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               managerId:
     *                 type: string
     *                 format: uuid
     *                 example: "504580e1-c8d4-4ab1-a2fa-1fb6a22b1bcb"
     *                 description: ID do gestor para associar aos carros e motoristas gerados (opcional)
     *               carCount:
     *                 type: integer
     *                 example: 5
     *                 description: Quantidade de carros a serem gerados (opcional, padrão é 5)
     *               driverCount:
     *                 type: integer
     *                 example: 3
     *                 description: Quantidade de motoristas a serem gerados (opcional, padrão é 3)
     *               eventCount:
     *                 type: integer
     *                 example: 4
     *                 description: Quantidade de eventos de checkout a serem gerados (opcional, padrão é 4, os eventos de return serão metade desse valor)
     *     responses:
     *       200:
     *         description: Geração concluída com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 message:
     *                   type: string
     *                   example: "Auto-generation completed successfully"
     *                 data:
     *                   type: object
     *                   properties:
     *                     cars:
     *                       type: integer
     *                       example: 5
     *                     drivers:
     *                       type: integer
     *                       example: 3
     *                     events:
     *                       type: object
     *                       properties:
     *                         checkouts:
     *                           type: integer
     *                           example: 4
     *                         returns:
     *                           type: integer
     *                           example: 2
     *                     managerId:
     *                       type: string
     *                       example: "504580e1-c8d4-4ab1-a2fa-1fb6a22b1bcb"
     *       401:
     *         description: Não autorizado (token inválido ou ausente)
     *       500:
     *         description: Erro no servidor
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: false
     *                 message:
     *                   type: string
     *                   example: "Failed to run immediate generation"
     *                 error:
     *                   type: string
     *                   example: "Error details"
     */
};
