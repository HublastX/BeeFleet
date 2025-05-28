export const DOCS_BOT_MESSAGE = {
    /**
     * @swagger
     * /api/message:
     *   post:
     *     summary: Envia uma mensagem para o bot
     *     description: Envia uma pergunta para o bot e recebe uma resposta baseada no sistema BeeFleet
     *     tags:
     *       - Bot
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - message
     *             properties:
     *               message:
     *                 type: string
     *                 description: Pergunta ou mensagem a ser enviada para o bot
     *                 example: "Como faço para registrar um novo veículo?"
     *     responses:
     *       200:
     *         description: Resposta do bot
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 response:
     *                   type: string
     *                   description: Resposta do bot para a pergunta
     *                   example: "Para registrar um novo veículo, acesse o menu Veículos e clique em Adicionar Veículo. Preencha os dados como placa, renavam, marca, modelo e ano."
     *       400:
     *         description: Requisição inválida
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: "Message is required"
     *       500:
     *         description: Erro ao comunicar com o serviço do bot
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: "Failed to communicate with the bot service"
     *                 details:
     *                   type: string
     *                   example: "Bot service responded with status: 500"
     */
};
