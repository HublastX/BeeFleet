export const DOCS_REPORT_CAR_GET_ALL_USAGE = {
    /**
     * @swagger
     * tags:
     *   - name: Reports
     *     description: Endpoints para a gestão de reports
     *
     * /api/report/all-cars:
     *   get:
     *     tags:
     *       - Reports
     *     summary: Lista o uso de todos os veículos por um relatório
     *     description: Obtém um relatório de todo o uso dos veículos
     *     operationId: getAllCarUsageReport
     *     responses:
     *       200:
     *         description: All cars usage report successfully retrieved.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 totalCars:
     *                   type: integer
     *                   description: Total number of cars in the report.
     *                 cars:
     *                   type: array
     *                   description: List of cars with usage details.
     *                   items:
     *                     type: object
     *                     properties:
     *                       id:
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
     *                       totalUsageTimes:
     *                         type: integer
     *                         description: Number of times the car was used.
     *                       totalOdometerChange:
     *                         type: number
     *                         description: Total odometer change for the car.
     *                       lastUsed:
     *                         type: string
     *                         format: date-time
     *                         description: Last time the car was used.
     *                       averageDailyUsage:
     *                         type: string
     *                         description: Average daily usage of the car.
     *                       currentOdometer:
     *                         type: number
     *                         description: Current odometer reading of the car.
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
