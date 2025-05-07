export const DOCS_DRIVER_GET_ALL = {
    /**
     * @swagger
     * /api/drivers:
     *   get:
     *     tags:
     *       - Drivers
     *     summary: Lista todos os motoristas
     *     description: Retorna uma lista de todos os motoristas cadastrados
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Lista de motoristas retornada com sucesso
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
     *                   example: 5
     *                 data:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       id:
     *                         type: string
     *                       name:
     *                         type: string
     *                       email:
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
     *         description: Erro ao buscar motoristas
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
