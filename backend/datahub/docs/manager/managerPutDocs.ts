export const DOCS_MANAGER_UPDATE = {
    /**
     * @swagger
     * /api/managers/{id}:
     *   put:
     *     tags:
     *       - Manager
     *     summary: Atualiza um gestor existente
     *     description: Atualiza parcial ou totalmente os dados de um gestor, incluindo imagem
     *     consumes:
     *       - multipart/form-data
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID do gestor a ser atualizado
     *     requestBody:
     *       content:
     *         multipart/form-data:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 example: "Novo Nome"
     *               email:
     *                 type: string
     *                 format: email
     *                 example: "novo@email.com"
     *               image:
     *                 type: string
     *                 format: binary
     *     responses:
     *       200:
     *         description: Gestor atualizado com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 message:
     *                   type: string
     *                   example: "Manager updated successfully"
     *                 data:
     *                   type: object
     *                   properties:
     *                     id:
     *                       type: string
     *                     name:
     *                       type: string
     *                     email:
     *                       type: string
     *                     image:
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
     *                 success:
     *                   type: boolean
     *                   example: false
     *                 message:
     *                   type: string
     *                   example: "Manager not found"
     *       500:
     *         description: Erro ao atualizar gestor
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: false
     *                 message:
     *                   type: string
     *                   example: "Error updating manager"
     *                 error:
     *                   type: string
     *                   example: "Error message details"
     */
};
