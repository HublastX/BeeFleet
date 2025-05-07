export const DOCS_DRIVER_UPDATE = {
    /**
     * @swagger
     * /api/drivers/{id}:
     *   put:
     *     tags:
     *       - Drivers
     *     summary: Atualiza um motorista existente
     *     description: Atualiza parcial ou totalmente os dados de um motorista, incluindo imagem
     *     consumes:
     *       - multipart/form-data
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID do motorista a ser atualizado
     *     requestBody:
     *       content:
     *         multipart/form-data:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: Nome do motorista
     *                 example: João Silva
     *               phone:
     *                 type: string
     *                 description: Telefone do motorista
     *                 example: "(11) 98765-4321"
     *               image:
     *                 type: string
     *                 description: Caminho da imagem do motorista
     *                 example: /uploads/driver-image.jpg
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: Nome do motorista
     *                 example: João Silva
     *               phone:
     *                 type: string
     *                 description: Telefone do motorista
     *                 example: "(11) 98765-4321"
     *               image:
     *                 type: string
     *                 description: Caminho da imagem do motorista
     *                 example: /uploads/driver-image.jpg
     *     responses:
     *       200:
     *         description: Motorista atualizado com sucesso
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
     *                   example: "Driver updated successfully"
     *                 data:
     *                   type: object
     *                   properties:
     *                     id:
     *                       type: string
     *                     name:
     *                       type: string
     *                     phone:
     *                       type: string
     *                     image:
     *                       type: string
     *       404:
     *         description: Motorista não encontrado
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
     *                   example: "Driver not found"
     *       400:
     *         description: Erro de validação
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
     *                   example: "Erro de validação"
     *                 errors:
     *                   type: object
     *                   description: Detalhes dos erros de validação
     *       500:
     *         description: Erro ao atualizar motorista
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
     *                   example: "Erro interno ao atualizar motorista"
     *                 error:
     *                   type: string
     *                   example: "Detalhes do erro"
     */
};
