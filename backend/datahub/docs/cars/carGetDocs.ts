export const DOCS_CAR_GET = {
    /**
     * @swagger
     * /api/cars/{id}:
     *   get:
     *     tags:
     *       - Cars
     *     summary: Obtém um veículo específico pelo ID
     *     description: Retorna os detalhes de um veículo específico
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID do veículo
     *     responses:
     *       200:
     *         description: Veículo encontrado com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: string
     *                 plate:
     *                   type: string
     *                 model:
     *                   type: string
     *                 year:
     *                   type: integer
     *                 color:
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
     *         description: Veículo não encontrado
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: "Car not found"
     *       500:
     *         description: Erro ao buscar veículo
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: "Error fetching car"
     */
};
