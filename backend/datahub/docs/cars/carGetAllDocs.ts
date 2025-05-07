export const DOCS_CAR_GET_ALL = {
    /**
     * @swagger
     * /api/cars:
     *   get:
     *     tags:
     *       - Cars
     *     summary: Lista todos os veículos
     *     description: Retorna uma lista de todos os veículos cadastrados
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Lista de veículos retornada com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 count:
     *                   type: integer
     *                   example: 10
     *                 data:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       id:
     *                         type: string
     *                       plate:
     *                         type: string
     *                       model:
     *                         type: string
     *                       year:
     *                         type: integer
     *                       color:
     *                         type: string
     *                       manager:
     *                         type: object
     *                         properties:
     *                           id:
     *                             type: string
     *                           name:
     *                             type: string
     *                           email:
     *                             type: string
     *       500:
     *         description: Erro ao buscar veículos
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: false
     *                 error:
     *                   type: string
     *                   example: "Server Error"
     */
};
