export const DOCS_MANAGER_GET = {
    /**
     * @swagger
     * tags:
     *   - name: Manager
     *     description: Endpoints para gestão de administradores
     *
     * /api/managers/{id}:
     *   get:
     *     tags:
     *       - Manager
     *     summary: Obtém um gestor específico pelo ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID do gestor
     *     responses:
     *       200:
     *         description: Gestor encontrado com sucesso
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
     *                 createdAt:
     *                   type: string
     *                   format: date-time
     *                 updatedAt:
     *                   type: string
     *                   format: date-time
     *       404:
     *         description: Gestor não encontrado
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: Manager not found
     *       500:
     *         description: Erro ao buscar gestor
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: Error fetching manager
     */
    /**
     * @swagger
     * /api/managers:
     *   get:
     *     tags:
     *       - Manager
     *     summary: Lista todos os gestores
     *     responses:
     *       200:
     *         description: Lista de gestores retornada com sucesso
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
     *                   example: 3
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
     *                       createdAt:
     *                         type: string
     *                         format: date-time
     *                       updatedAt:
     *                         type: string
     *                         format: date-time
     *       500:
     *         description: Erro ao buscar gestores
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
     *                   example: Server Error
     */
};
