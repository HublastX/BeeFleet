export const DOCS_EVENT_GET = {
    /**
     * @swagger
     * /api/events/checkout/{id}:
     *   get:
     *     summary: Obtém um evento específico pelo ID
     *     description: Retorna os detalhes de um evento específico
     *     tags:
     *       - Events
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the event to retrieve.
     *     responses:
     *       200:
     *         description: Event retrieved successfully.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: string
     *                   description: ID of the event.
     *                   example: "b2d3eb32-04b5-4a38-8de2-7c7884240fca"
     *                 eventType:
     *                   type: string
     *                   description: Type of the event (e.g., CHECKOUT, RETURN).
     *                   example: "CHECKOUT"
     *                 odometer:
     *                   type: number
     *                   description: Odometer reading at the time of the event.
     *                   example: 10000
     *                 isActive:
     *                   type: boolean
     *                   description: Indicates if the event is active.
     *                   example: true
     *                 status:
     *                   type: string
     *                   description: Status of the event (e.g., ACTIVE, COMPLETED).
     *                   example: "COMPLETED"
     *                 createdAt:
     *                   type: string
     *                   format: date-time
     *                   description: Timestamp when the event was created.
     *                   example: "2025-05-02T21:07:28.821Z"
     *                 endedAt:
     *                   type: string
     *                   format: date-time
     *                   description: Timestamp when the event ended (if applicable).
     *                   example: "2025-05-02T21:08:33.195Z"
     *                 managerId:
     *                   type: string
     *                   description: ID of the manager who created the event.
     *                   example: "5fe2a3fc-f51d-43c1-8153-2f3d4c327fbe"
     *                 driverId:
     *                   type: string
     *                   description: ID of the driver involved in the event.
     *                   example: "cbfe2652-1d24-4f9a-a01c-d277ff607d26"
     *                 carId:
     *                   type: string
     *                   description: ID of the car involved in the event.
     *                   example: "f3597dca-2f83-462d-95ca-b1fce2194d73"
     *                 checkoutEventId:
     *                   type: string
     *                   description: ID of the related checkout event, if applicable.
     *                   example: null
     *       404:
     *         description: Event not found.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   description: Error message.
     *                   example: "Evento não encontrado"
     *       500:
     *         description: Internal server error.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   description: Error message.
     *                   example: "Erro ao buscar evento"
     */
};
