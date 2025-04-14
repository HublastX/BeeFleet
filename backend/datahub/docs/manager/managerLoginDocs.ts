export const DOCS_MANAGER_LOGIN = {
    /**
     * @swagger
     * tags:
     *   - name: Auth
     *     description: Endpoints de autenticação
     *
     * /api/managers/login:
     *   post:
     *     tags:
     *       - Auth
     *     summary: Login de gestor
     *     description: Autentica um gestor e retorna um token JWT
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - email
     *               - password
     *             properties:
     *               email:
     *                 type: string
     *                 format: email
     *                 example: "admin@beefleet.com"
     *               password:
     *                 type: string
     *                 format: password
     *                 example: "senhaSegura123"
     *     responses:
     *       200:
     *         description: Login bem-sucedido
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Login bem-sucedido"
     *                 token:
     *                   type: string
     *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
     *                 manager:
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
     *       401:
     *         description: Credenciais inválidas
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: "Credenciais inválidas"
     *       500:
     *         description: Erro no servidor
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: "Erro no servidor"
     */
};
