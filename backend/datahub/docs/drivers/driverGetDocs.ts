export const DOCS_DRIVER_GET = {
    /**
     * @swagger
     * /api/drivers/{id}:
     *   get:
     *     tags:
     *       - Drivers
     *     summary: Obtém um motorista específico pelo ID
     *     description: Retorna os detalhes de um motorista específico
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID do motorista
     *     responses:
     *       200:
     *         description: Motorista encontrado com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: string
     *                 name:
     *                   type: string
     *                 email:
     *                   type: string
     *                 manager:
     *                   type: object
     *                   properties:
     *                     id:
     *                       type: string
     *                     name:
     *                       type: string
     *                     email:
     *                       type: string
     *       404:
     *         description: Motorista não encontrado
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: "Driver not found"
     *       500:
     *         description: Erro ao buscar motorista
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: "Error fetching driver"
     */
};
