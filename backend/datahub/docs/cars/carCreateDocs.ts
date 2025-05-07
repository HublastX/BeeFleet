export const DOCS_CAR_CREATE = {
    /**
     * @swagger
     * tags:
     *   - name: Cars
     *     description: Endpoints para gestão de veículos
     *
     * /api/cars/create:
     *   post:
     *     tags:
     *       - Cars
     *     summary: Cria um novo veículo
     *     description: Cria um novo veículo vinculado a um gestor, requer autenticação e dados obrigatórios como placa, chassi e odômetro, podendo ter imagem opcional.
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
     *               - renavam
     *               - chassis
     *               - plate
     *               - brand
     *               - model
     *               - year
     *               - color
     *               - odometer
     *               - managerId
     *             properties:
     *               renavam:
     *                 type: string
     *                 example: "12345678901"
     *               chassis:
     *                 type: string
     *                 example: "9BWZZZ377VT004251"
     *               plate:
     *                 type: string
     *                 example: "ABC1D23"
     *               brand:
     *                 type: string
     *                 example: "Fiat"
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
     *                     renavam:
     *                       type: string
     *                     chassis:
     *                       type: string
     *                     plate:
     *                       type: string
     *                     brand:
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
