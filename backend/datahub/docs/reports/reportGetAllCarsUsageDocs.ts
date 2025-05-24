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
     *                       createdAt:
     *                         type: string
     *                         format: date-time
     *                         description: Date when the car was created.
     *                       totalUsageTimes:
     *                         type: integer
     *                         description: Number of times the car was used.
     *                       totalOdometerChange:
     *                         type: number
     *                         description: Total odometer change for the car.
     *                       uniqueDriversUsed:
     *                         type: integer
     *                         description: Number of unique drivers who used the car.
     *                       lastUsed:
     *                         type: string
     *                         format: date-time
     *                         description: Last time the car was used.
     *                       driverUsageDetails:
     *                         type: array
     *                         description: Details of drivers who used the car.
     *                         items:
     *                           type: object
     *                           properties:
     *                             driverId:
     *                               type: string
     *                             name:
     *                               type: string
     *                             phone:
     *                               type: string
     *                             license:
     *                               type: string
     *                             totalUsageTimes:
     *                               type: integer
     *                               description: Number of times the driver used the car.
     *                             totalOdometerChange:
     *                               type: number
     *                               description: Total odometer change by the driver.
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
