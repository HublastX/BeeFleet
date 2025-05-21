export const DOCS_REPORT_EVENT_GET_ALL = {
    /**
     * @swagger
     * /api/report/all-events:
     *   get:
     *     summary: Lista todos os eventos por um relatório
     *     description: Obtém um relatório de todos dos eventos
     *     tags:
     *       - Reports
     *     responses:
     *       200:
     *         description: A list of events.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: string
     *                     description: The unique identifier of the event.
     *                     example: "12345"
     *                   name:
     *                     type: string
     *                     description: The name of the event.
     *                     example: "Fleet Maintenance"
     *                   timestamp:
     *                     type: string
     *                     format: date-time
     *                     description: The timestamp of the event.
     *                     example: "2025-05-21T10:00:00Z"
     *       500:
     *         description: Internal server error.
     */
};
