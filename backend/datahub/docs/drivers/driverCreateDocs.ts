export const DOCS_DRIVER_CREATE = {
    /**
     * @swagger
     * tags:
     *   - name: Drivers
     *     description: Endpoints para gestão de motoristas
     *
     * /api/drivers/create:
     *   post:
     *     tags:
     *       - Drivers
     *     summary: Cria um novo motorista
     *     description: Cria um novo motorista vinculado a um gestor, requer autenticação e dados obrigatórios como nome, telefone e CNH, podendo ter imagem opcional.
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
     *               - name
     *               - phone
     *               - license
     *               - managerId
     *             properties:
     *               name:
     *                 type: string
     *                 example: "João Silva"
     *               phone:
     *                 type: string
     *                 example: "(11) 99999-9999"
     *               license:
     *                 type: string
     *                 example: "12345678901"
     *               managerId:
     *                 type: string
     *                 example: "clxyz24vq000008l49fhwb5f2"
     *               image:
     *                 type: string
     *                 format: binary
     *     responses:
     *       201:
     *         description: Motorista criado com sucesso
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
     *                   example: "Motorista criado com sucesso"
     *                 data:
     *                   type: object
     *                   properties:
     *                     id:
     *                       type: string
     *                     name:
     *                       type: string
     *                     phone:
     *                       type: string
     *                     license:
     *                       type: string
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
     *       400:
     *         description: Dados inválidos
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
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       field:
     *                         type: string
     *                       message:
     *                         type: string
     *       401:
     *         description: Não autorizado (token inválido ou ausente)
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
     *                   example: "Falha ao criar motorista"
     *                 error:
     *                   type: string
     *                   example: "Error details"
     */
};
