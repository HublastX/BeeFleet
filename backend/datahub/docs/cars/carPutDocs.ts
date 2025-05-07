export const DOCS_CAR_UPDATE = {
    /**
     * @swagger
     * /api/cars/{id}:
     *   put:
     *     tags:
     *       - Cars
     *     summary: Atualiza um veículo existente
     *     description: Atualiza parcial ou totalmente os dados de um veículo, incluindo imagem
     *     consumes:
     *       - multipart/form-data
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID do veículo a ser atualizado
     *     requestBody:
     *       content:
     *         multipart/form-data:
     *           schema:
     *             type: object
     *             properties:
     *               plate:
     *                 type: string
     *                 description: Placa do veículo
     *                 example: ABC1234
     *               brand:
     *                 type: string
     *                 description: Marca do veículo
     *                 example: Toyota
     *               model:
     *                 type: string
     *                 description: Modelo do veículo
     *                 example: Corolla
     *               year:
     *                 type: integer
     *                 description: Ano de fabricação do veículo
     *                 example: 2020
     *               color:
     *                 type: string
     *                 description: Cor do veículo
     *                 example: Preto
     *               image:
     *                 type: string
     *                 description: Caminho da imagem do veículo
     *                 example: /uploads/car-image.jpg
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               plate:
     *                 type: string
     *                 description: Placa do veículo
     *                 example: ABC1234
     *               brand:
     *                 type: string
     *                 description: Marca do veículo
     *                 example: Toyota
     *               model:
     *                 type: string
     *                 description: Modelo do veículo
     *                 example: Corolla
     *               year:
     *                 type: integer
     *                 description: Ano de fabricação do veículo
     *                 example: 2020
     *               color:
     *                 type: string
     *                 description: Cor do veículo
     *                 example: Preto
     *               image:
     *                 type: string
     *                 description: Caminho da imagem do veículo
     *                 example: /uploads/car-image.jpg
     *     responses:
     *       200:
     *         description: Veículo atualizado com sucesso
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
     *                   example: "Car updated successfully"
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
     *                     image:
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
     *       409:
     *         description: Conflito de dados (placa já em uso)
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
     *                   example: "Essa placa já está em uso por outro veículo"
     *       500:
     *         description: Erro ao atualizar veículo
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
     *                   example: "Error updating car"
     *                 error:
     *                   type: string
     *                   example: "Detalhes do erro"
     */
};
