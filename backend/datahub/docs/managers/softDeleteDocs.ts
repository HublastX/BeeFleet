export const DOCS_SOFT_DELETE = {
    /**
     * @swagger
     * /api/car/{id}/soft-delete:
     *   patch:
     *     summary: Oculta um carro (soft delete)
     *     description: Marca um carro como ocultado, mas mantém os dados no sistema para relatórios
     *     tags:
     *       - Data Management
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID do carro a ser ocultado
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               managerId:
     *                 type: string
     *                 description: ID do gestor que está ocultando o carro
     *               reason:
     *                 type: string
     *                 description: Motivo pelo qual o carro está sendo ocultado
     *     responses:
     *       200:
     *         description: Carro ocultado com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                 success:
     *                   type: boolean
     *                 carId:
     *                   type: string
     *                 carInfo:
     *                   type: string
     *                 deletedById:
     *                   type: string
     *                 deletedAt:
     *                   type: string
     *                   format: date-time
     *                 canBeRestored:
     *                   type: boolean
     *       400:
     *         description: Requisição inválida
     *       404:
     *         description: Carro não encontrado
     *       500:
     *         description: Erro interno do servidor
     *
     * /api/driver/{id}/soft-delete:
     *   patch:
     *     summary: Oculta um motorista (soft delete)
     *     description: Marca um motorista como ocultado, mas mantém os dados no sistema para relatórios
     *     tags:
     *       - Data Management
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID do motorista a ser ocultado
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               managerId:
     *                 type: string
     *                 description: ID do gestor que está ocultando o motorista
     *               reason:
     *                 type: string
     *                 description: Motivo pelo qual o motorista está sendo ocultado
     *     responses:
     *       200:
     *         description: Motorista ocultado com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                 success:
     *                   type: boolean
     *                 driverId:
     *                   type: string
     *                 driverName:
     *                   type: string
     *                 deletedById:
     *                   type: string
     *                 deletedAt:
     *                   type: string
     *                   format: date-time
     *                 canBeRestored:
     *                   type: boolean
     *       400:
     *         description: Requisição inválida
     *       404:
     *         description: Motorista não encontrado
     *       500:
     *         description: Erro interno do servidor
     *
     * /api/event/{id}/soft-delete:
     *   patch:
     *     summary: Oculta um evento (soft delete)
     *     description: Marca um evento como ocultado, mas mantém os dados no sistema para relatórios
     *     tags:
     *       - Data Management
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID do evento a ser ocultado
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               managerId:
     *                 type: string
     *                 description: ID do gestor que está ocultando o evento
     *               reason:
     *                 type: string
     *                 description: Motivo pelo qual o evento está sendo ocultado
     *     responses:
     *       200:
     *         description: Evento ocultado com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                 success:
     *                   type: boolean
     *                 eventId:
     *                   type: string
     *                 eventInfo:
     *                   type: string
     *                 deletedById:
     *                   type: string
     *                 deletedAt:
     *                   type: string
     *                   format: date-time
     *                 canBeRestored:
     *                   type: boolean
     *       400:
     *         description: Requisição inválida
     *       404:
     *         description: Evento não encontrado
     *       500:
     *         description: Erro interno do servidor
     *
     * /api/restore/{itemType}/{itemId}:
     *   patch:
     *     summary: Restaura um item previamente ocultado
     *     description: Remove a marcação de soft delete e torna o item visível novamente
     *     tags:
     *       - Data Management
     *     parameters:
     *       - in: path
     *         name: itemType
     *         required: true
     *         schema:
     *           type: string
     *           enum: [car, driver, event]
     *         description: Tipo do item a ser restaurado (car, driver ou event)
     *       - in: path
     *         name: itemId
     *         required: true
     *         schema:
     *           type: string
     *         description: ID do item a ser restaurado
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               managerId:
     *                 type: string
     *                 description: ID do gestor que está restaurando o item
     *     responses:
     *       200:
     *         description: Item restaurado com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                 success:
     *                   type: boolean
     *                 itemType:
     *                   type: string
     *                 itemId:
     *                   type: string
     *                 restoredById:
     *                   type: string
     *                 restoredAt:
     *                   type: string
     *                   format: date-time
     *       400:
     *         description: Requisição inválida
     *       404:
     *         description: Item não encontrado
     *       500:
     *         description: Erro interno do servidor
     */
};
