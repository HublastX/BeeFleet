export const DOCS_EVENT_CREATE = {
    /**
     * @swagger
     * tags:
     *   - name: Events
     *     description: Endpoints para gestão de eventos
     *
     * /api/events/checkout:
     *   post:
     *     tags:
     *       - Events
     *     summary: Cria um novo evento (CHECKOUT ou RETURN)
     *     description: Cria um evento de CHECKOUT ou RETURN de um veículo, registrando odômetro e IDs envolvidos.
     *     consumes:
     *       - application/json
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               eventType:
     *                 type: string
     *                 enum: [CHECKOUT, RETURN]
     *                 description: Type of the event.
     *               odometer:
     *                 type: number
     *                 description: Current odometer reading of the car.
     *               managerId:
     *                 type: string
     *                 description: ID of the manager creating the event.
     *               driverId:
     *                 type: string
     *                 description: ID of the driver involved in the event.
     *               carId:
     *                 type: string
     *                 description: ID of the car involved in the event.
     *               checkoutEventId:
     *                 type: string
     *                 description: ID of the related checkout event (required for RETURN events).
     *             required:
     *               - eventType
     *               - odometer
     *               - managerId
     *               - driverId
     *               - carId
     *     responses:
     *       200:
     *         description: Event created successfully.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 event:
     *                   type: object
     *                   description: Details of the created event.
     *                 report:
     *                   type: object
     *                   description: Report generated for RETURN events.
     *                 duration:
     *                   type: string
     *                   description: Duration of the event in hours (for RETURN events).
     *       400:
     *         description: Bad request (e.g., invalid input or business rule violation).
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   description: Error message.
     *       404:
     *         description: Resource not found (e.g., car or driver not found).
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   description: Error message.
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
     */
};
