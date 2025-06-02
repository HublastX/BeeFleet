export const DOCS_MANAGER_CREATE = {
    /**
     * @swagger
     * tags:
     *   - name: Auth
     *     description: Endpoints para gestão de administradores
     *
     * /api/managers/create:
     *   post:
     *     tags:
     *       - Auth
     *     summary: Cria um novo gestor
     *     description: Cria um novo gestor com nome, e-mail, senha e imagem opcional
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
     *               - email
     *               - password
     *             properties:
     *               name:
     *                 type: string
     *                 example: João da Silva
     *               email:
     *                 type: string
     *                 format: email
     *                 example: joao@email.com
     *               password:
     *                 type: string
     *                 format: password
     *                 example: senhaSegura123
     *               image:
     *                 type: string
     *                 format: binary
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - name
     *               - email
     *               - password
     *             properties:
     *               name:
     *                 type: string
     *                 example: João da Silva
     *               email:
     *                 type: string
     *                 format: email
     *                 example: joao@email.com
     *               password:
     *                 type: string
     *                 format: password
     *                 example: senhaSegura123
     *               image:
     *                 type: string
     *                 format: binary
     *     responses:
     *       201:
     *         description: Gestor criado com sucesso
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
     *                   example: Manager created successfully
     *                 data:
     *                   type: object
     *                   properties:
     *                     id:
     *                       type: string
     *                       format: uuid
     *                       example: 123e4567-e89b-12d3-a456-426614174000
     *                     name:
     *                       type: string
     *                     email:
     *                       type: string
     *                     image:
     *                       type: string
     *       400:
     *         description: Já existe um gestor com esse e-mail
     *       500:
     *         description: Erro interno ao criar o gestor
     */
};
