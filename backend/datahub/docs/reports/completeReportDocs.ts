export const DOCS_COMPLETE_REPORT = {
    /**
     * @swagger
     * /api/report/complete-report:
     *   get:
     *     summary: Relatório completo com itens ativos e excluídos
     *     description: Obtém um relatório completo de todos os gestores, incluindo carros, motoristas e eventos ativos e excluídos
     *     tags:
     *       - Reports
     *     parameters:
     *       - in: query
     *         name: startDate
     *         schema:
     *           type: string
     *           format: date
     *         description: Data inicial para filtrar os resultados (formato YYYY-MM-DD)
     *         required: false
     *       - in: query
     *         name: endDate
     *         schema:
     *           type: string
     *           format: date
     *         description: Data final para filtrar os resultados (formato YYYY-MM-DD)
     *         required: false
     *     responses:
     *       200:
     *         description: Relatório completo com todos os dados ativos e excluídos
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 managers:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       id:
     *                         type: string
     *                         description: Identificador único do gestor
     *                       name:
     *                         type: string
     *                         description: Nome do gestor
     *                       email:
     *                         type: string
     *                         description: Email do gestor
     *                       createdAt:
     *                         type: string
     *                         format: date-time
     *                         description: Data de criação do registro
     *                       updatedAt:
     *                         type: string
     *                         format: date-time
     *                         description: Data da última atualização
     *                       drivers:
     *                         type: array
     *                         description: Motoristas ativos
     *                         items:
     *                           type: object
     *                           properties:
     *                             id:
     *                               type: string
     *                             name:
     *                               type: string
     *                             phone:
     *                               type: string
     *                             license:
     *                               type: string
     *                             isAvailable:
     *                               type: boolean
     *                             status:
     *                               type: string
     *                       deletedDrivers:
     *                         type: array
     *                         description: Motoristas excluídos
     *                         items:
     *                           type: object
     *                           properties:
     *                             id:
     *                               type: string
     *                             name:
     *                               type: string
     *                             phone:
     *                               type: string
     *                             license:
     *                               type: string
     *                             deletedAt:
     *                               type: string
     *                               format: date-time
     *                             deletedById:
     *                               type: string
     *                             deletedByName:
     *                               type: string
     *                               description: Nome do gestor que excluiu o item
     *                             status:
     *                               type: string
     *                       cars:
     *                         type: array
     *                         description: Carros ativos
     *                         items:
     *                           type: object
     *                           properties:
     *                             id:
     *                               type: string
     *                             renavam:
     *                               type: string
     *                             chassis:
     *                               type: string
     *                             plate:
     *                               type: string
     *                             brand:
     *                               type: string
     *                             model:
     *                               type: string
     *                             year:
     *                               type: integer
     *                             color:
     *                               type: string
     *                             status:
     *                               type: string
     *                             isAvailable:
     *                               type: boolean
     *                       deletedCars:
     *                         type: array
     *                         description: Carros excluídos
     *                         items:
     *                           type: object
     *                           properties:
     *                             id:
     *                               type: string
     *                             renavam:
     *                               type: string
     *                             chassis:
     *                               type: string
     *                             plate:
     *                               type: string
     *                             brand:
     *                               type: string
     *                             model:
     *                               type: string
     *                             year:
     *                               type: integer
     *                             color:
     *                               type: string
     *                             deletedAt:
     *                               type: string
     *                               format: date-time
     *                             deletedById:
     *                               type: string
     *                             deletedByName:
     *                               type: string
     *                               description: Nome do gestor que excluiu o item
     *                             status:
     *                               type: string
     *                       events:
     *                         type: array
     *                         description: Eventos ativos
     *                         items:
     *                           type: object
     *                           properties:
     *                             id:
     *                               type: string
     *                             eventType:
     *                               type: string
     *                             odometer:
     *                               type: integer
     *                             isActive:
     *                               type: boolean
     *                             status:
     *                               type: string
     *                             createdAt:
     *                               type: string
     *                               format: date-time
     *                             endedAt:
     *                               type: string
     *                               format: date-time
     *                               nullable: true
     *                             driverName:
     *                               type: string
     *                             carInfo:
     *                               type: string
     *                       deletedEvents:
     *                         type: array
     *                         description: Eventos excluídos
     *                         items:
     *                           type: object
     *                           properties:
     *                             id:
     *                               type: string
     *                             eventType:
     *                               type: string
     *                             odometer:
     *                               type: integer
     *                             status:
     *                               type: string
     *                             createdAt:
     *                               type: string
     *                               format: date-time
     *                             endedAt:
     *                               type: string
     *                               format: date-time
     *                               nullable: true
     *                             deletedAt:
     *                               type: string
     *                               format: date-time
     *                             deletedById:
     *                               type: string
     *                             deletedByName:
     *                               type: string
     *                               description: Nome do gestor que excluiu o item
     *                             driverName:
     *                               type: string
     *                             carInfo:
     *                               type: string
     *                       summary:
     *                         type: object
     *                         properties:
     *                           totalDrivers:
     *                             type: integer
     *                           totalDeletedDrivers:
     *                             type: integer
     *                           totalCars:
     *                             type: integer
     *                           totalDeletedCars:
     *                             type: integer
     *                           totalEvents:
     *                             type: integer
     *                           totalDeletedEvents:
     *                             type: integer
     *                 globalStats:
     *                   type: object
     *                   properties:
     *                     totalManagers:
     *                       type: integer
     *                     totalDrivers:
     *                       type: integer
     *                     totalDeletedDrivers:
     *                       type: integer
     *                     totalCars:
     *                       type: integer
     *                     totalDeletedCars:
     *                       type: integer
     *                     totalEvents:
     *                       type: integer
     *                     totalDeletedEvents:
     *                       type: integer
     *                 filters:
     *                   type: object
     *                   properties:
     *                     startDate:
     *                       type: string
     *                       format: date
     *                       nullable: true
     *                       description: Data inicial utilizada no filtro
     *                     endDate:
     *                       type: string
     *                       format: date
     *                       nullable: true
     *                       description: Data final utilizada no filtro
     *       500:
     *         description: Erro interno do servidor
     */
};
