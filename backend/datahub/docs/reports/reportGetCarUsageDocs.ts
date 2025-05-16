export const DOCS_REPORT_GET_CAR_USAGE = {
    /**
     * @swagger
     * /api/report/car-usage:
     *   get:
     *     tags:
     *       - Reports
     *     summary: Lista o uso do veículo por um relatório
     *     description: Obtém um relatório de o uso do veículo filtrado pelo ID do gerente e data
     *     operationId: getCarUsageReport
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
     *       - name: carId
     *         in: query
     *         required: false
     *         description: ID do veículo
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
     *         description: Car usage report successfully retrieved.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 totalEvents:
     *                   type: integer
     *                   description: Total number of events in the report.
     *                 cars:
     *                   type: array
     *                   description: List of cars with usage details.
     *                   items:
     *                     type: object
     *                     properties:
     *                       carId:
     *                         type: string
     *                       renavam:
     *                         type: string
     *                       chassis:
     *                         type: string
     *                       plate:
     *                         type: string
     *                       brand:
     *                         type: string
     *                       model:
     *                         type: string
     *                       year:
     *                         type: integer
     *                       color:
     *                         type: string
     *                       status:
     *                         type: string
     *                       usageCount:
     *                         type: integer
     *                         description: Number of times the car was used.
     *                       totalOdometer:
     *                         type: number
     *                         description: Total odometer reading for the car.
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
