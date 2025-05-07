export const DOCS_CAR_DELETE = {
    /**
     * @swagger
     * /api/cars/{id}:
     *   delete:
     *     tags:
     *       - Cars
     *     summary: Remove um veículo
     *     description: Remove permanentemente um veículo do sistema
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID do veículo a ser removido
     *     responses:
     *       200:
     *         description: Veículo removido com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Car deleted successfully"
     *                 data:
     *                   type: object
     *                   properties:
     *                     id:
     *                       type: string
     *                     plate:
     *                       type: string
     *                     model:
     *                       type: string
     *                     year:
     *                       type: integer
     *                     color:
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
     *         description: Erro ao remover veículo
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: "Error deleting car"
     */
};
