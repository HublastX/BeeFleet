export const DOCS_CAR_CREATE = {
    /**
     * @swagger
     * tags:
     *   - name: Cars
     *     description: Gestão de veículos
     *
     * /api/cars/create:
     *   post:
     *     tags:
     *       - Cars
     *     summary: Cria um novo veículo
     *     description: Rota protegida que requer autenticação JWT
     *     security:
     *       - bearerAuth: []
     *     consumes:
     *       - multipart/form-data
     *     requestBody:
     *       required: true
     *       content:
     *         multipart/form-data:
     *           schema:
     *             type: object
     *             required:
     *               - plate
     *               - model
     *               - year
     *               - color
     *               - odometer
     *               - managerId
     *             properties:
     *               plate:
     *                 type: string
     *                 example: "ABC1D23"
     *               model:
     *                 type: string
     *                 example: "Fiat Toro"
     *               year:
     *                 type: integer
     *                 example: 2023
     *               color:
     *                 type: string
     *                 example: "Vermelho"
     *               odometer:
     *                 type: integer
     *                 example: 0
     *               managerId:
     *                 type: string
     *                 example: "clxyz24vq000008l49fhwb5f2"
     *               image:
     *                 type: string
     *                 format: binary
     *     responses:
     *       201:
     *         description: Veículo criado com sucesso
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
     *                   example: "Carro criado com sucesso"
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
     *                     odometer:
     *                       type: integer
     *                     image:
     *                       type: string
     *                     managerId:
     *                       type: string
     *                     createdAt:
     *                       type: string
     *                       format: date-time
     *                     updatedAt:
     *                       type: string
     *                       format: date-time
     *       401:
     *         description: Não autorizado (token inválido ou ausente)
     *       409:
     *         description: Placa já cadastrada
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
     *                   example: "Placa já está cadastrada"
     *       500:
     *         description: Erro no servidor
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
     *                   example: "Falha ao criar carro"
     *                 error:
     *                   type: string
     *                   example: "Error details"
     */
};
