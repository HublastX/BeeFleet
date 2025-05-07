export const DOCS_DRIVER_DELETE = {
    /**
     * @swagger
     * /api/drivers/{id}:
     *   delete:
     *     tags:
     *       - Drivers
     *     summary: Remove um motorista
     *     description: Remove permanentemente um motorista do sistema
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID do motorista a ser removido
     *     responses:
     *       200:
     *         description: Motorista removido com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Driver deleted successfully"
     *                 data:
     *                   type: object
     *                   properties:
     *                     id:
     *                       type: string
     *                     name:
     *                       type: string
     *                     licenseNumber:
     *                       type: string
     *                     phone:
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
     *         description: Erro ao remover motorista
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: "Error deleting driver"
     */
};
