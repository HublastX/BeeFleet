export const DOCS_EVENT_UPDATE = {
    /**
     * @swagger
     * /api/events/{id}:
     *   put:
     *     tags:
     *       - Events
     *     summary: Atualiza um evento existente
     *     description: Atualiza os dados de um evento
     *     consumes:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID of the event to update.
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
     *                 description: ID of the manager updating the event.
     *               driverId:
     *                 type: string
     *                 description: ID of the driver involved in the event.
     *               carId:
     *                 type: string
     *                 description: ID of the car involved in the event.
     *               checkoutEventId:
     *                 type: string
     *                 description: ID of the related checkout event (required for RETURN events).
     *               image:
     *                 type: string
     *                 description: Path to the image associated with the event.
     *             required:
     *               - eventType
     *               - odometer
     *               - managerId
     *               - driverId
     *               - carId
     *     responses:
     *       200:
     *         description: Event updated successfully.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   description: Indicates if the operation was successful.
     *                 message:
     *                   type: string
     *                   description: Success message.
     *                 data:
     *                   type: object
     *                   description: Details of the updated event.
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
     *         description: Event not found.
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
