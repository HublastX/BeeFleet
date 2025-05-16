export const DOCS_REPORT_GET_DRIVER_USAGE = {
    /**
     * @swagger
     * /api/report/driver-usage:
     *   get:
     *     tags:
     *       - Reports
     *     summary: Lista o uso do motorista por um relatório
     *     description: Obtém um relatório de o uso do motorista filtrado pelo ID do gerente e data
     *     operationId: getDriverUsageReport
     *     parameters:
     *       - name: startDate
     *         in: query
     *         required: true
     *         description: Data de inicio
     *         schema:
     *           type: string
     *           format: date-time
     *       - name: endDate
     *         in: query
     *         required: true
     *         description: Data de fim
     *         schema:
     *           type: string
     *           format: date-time
     *       - name: driverId
     *         in: query
     *         required: false
     *         description: ID do motorista
     *         schema:
     *           type: string
     *       - name: managerId
     *         in: query
     *         required: false
     *         description: ID do gestor
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Driver usage report successfully retrieved.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 totalEvents:
     *                   type: integer
     *                   description: Total number of events in the report.
     *                 drivers:
     *                   type: array
     *                   description: List of drivers with usage details.
     *                   items:
     *                     type: object
     *                     properties:
     *                       driverId:
     *                         type: string
     *                       name:
     *                         type: string
     *                       phone:
     *                         type: string
     *                       usageCount:
     *                         type: integer
     *                         description: Number of times the driver was involved in events.
     *                       cars:
     *                         type: array
     *                         description: List of car IDs used by the driver.
     *                         items:
     *                           type: string
     *                       totalOdometer:
     *                         type: number
     *                         description: Total odometer reading for the driver.
     *                 startDate:
     *                   type: string
     *                   format: date-time
     *                   description: Start date of the report.
     *                 endDate:
     *                   type: string
     *                   format: date-time
     *                   description: End date of the report.
     *       400:
     *         description: Invalid request parameters.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *       404:
     *         description: Driver not found.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *       500:
     *         description: Internal server error.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     */
};
