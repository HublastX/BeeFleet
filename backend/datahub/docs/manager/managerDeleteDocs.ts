export const DOCS_MANAGER_DELETE = {
    /**
     * @swagger
     * /api/managers/{id}:
     *   delete:
     *     tags:
     *       - Manager
     *     summary: Remove um gestor
     *     description: Remove permanentemente um gestor do sistema
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID do gestor a ser removido
     *     responses:
     *       200:
     *         description: Gestor removido com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Manager deleted successfully"
     *                 data:
     *                   type: object
     *                   properties:
     *                     id:
     *                       type: string
     *                     name:
     *                       type: string
     *                     email:
     *                       type: string
     *                     createdAt:
     *                       type: string
     *                       format: date-time
     *                     updatedAt:
     *                       type: string
     *                       format: date-time
     *       404:
     *         description: Gestor não encontrado
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: "Manager not found"
     *       500:
     *         description: Erro ao remover gestor
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: "Error deleting manager"
     */
};
