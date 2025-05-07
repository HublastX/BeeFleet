export const DOCS_EVENT_GET_ALL = {
    /**
     * @swagger
     * /api/events/checkout:
     *   get:
     *     tags:
     *       - Events
     *     summary: Lista todos os eventos
     *     description: Retorna uma lista de todos os eventos cadastrados
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: A list of events.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 count:
     *                   type: integer
     *                   example: 2
     *                 data:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       id:
     *                         type: string
     *                         example: "b2d3eb32-04b5-4a38-8de2-7c7884240fca"
     *                       eventType:
     *                         type: string
     *                         example: "CHECKOUT"
     *                       odometer:
     *                         type: integer
     *                         example: 10000
     *                       isActive:
     *                         type: boolean
     *                         example: true
     *                       status:
     *                         type: string
     *                         example: "COMPLETED"
     *                       createdAt:
     *                         type: string
     *                         format: date-time
     *                         example: "2025-05-02T21:07:28.821Z"
     *                       endedAt:
     *                         type: string
     *                         format: date-time
     *                         example: "2025-05-02T21:08:33.195Z"
     *                       managerId:
     *                         type: string
     *                         example: "5fe2a3fc-f51d-43c1-8153-2f3d4c327fbe"
     *                       driverId:
     *                         type: string
     *                         example: "cbfe2652-1d24-4f9a-a01c-d277ff607d26"
     *                       carId:
     *                         type: string
     *                         example: "f3597dca-2f83-462d-95ca-b1fce2194d73"
     *                       checkoutEventId:
     *                         type: string
     *                         nullable: true
     *                         example: null
     *       404:
     *         description: No events found.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: false
     *                 error:
     *                   type: string
     *                   example: "No events found"
     *       500:
     *         description: Server error.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: false
     *                 error:
     *                   type: string
     *                   example: "Server Error"
     */
};
