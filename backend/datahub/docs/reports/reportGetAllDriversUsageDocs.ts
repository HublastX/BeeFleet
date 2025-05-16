export const DOCS_REPORT_DRIVER_GET_ALL_USAGE = {
    /**
     * @swagger
     * /api/report/all-drivers:
     *   get:
     *     tags:
     *       - Reports
     *     summary: Lista o uso de todos os motoristas por um relatório
     *     description: Obtém um relatório de todo o uso dos motoristas filtrado pelo ID do gerente
     *     operationId: getAllDriversUsageReport
     *     parameters:
     *       - name: managerId
     *         in: query
     *         required: true
     *         description: Filtra pelo ID do gestor
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: All drivers usage report successfully retrieved.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 totalDrivers:
     *                   type: integer
     *                   description: Total number of drivers in the report.
     *                 drivers:
     *                   type: array
     *                   description: List of drivers with usage details.
     *                   items:
     *                     type: object
     *                     properties:
     *                       id:
     *                         type: string
     *                       name:
     *                         type: string
     *                       phone:
     *                         type: string
     *                       license:
     *                         type: string
     *                       totalUsageTimes:
     *                         type: integer
     *                         description: Number of times the driver used cars.
     *                       uniqueCarsUsed:
     *                         type: integer
     *                         description: Number of unique cars used by the driver.
     *                       totalOdometerChange:
     *                         type: number
     *                         description: Total odometer change for all cars used by the driver.
     *                       lastUsed:
     *                         type: string
     *                         format: date-time
     *                         description: Last time the driver used a car.
     *                       carUsageDetails:
     *                         type: array
     *                         description: Details of cars used by the driver.
     *                         items:
     *                           type: object
     *                           properties:
     *                             carId:
     *                               type: string
     *                             renavam:
     *                               type: string
     *                             chassis:
     *                               type: string
     *                             plate:
     *                               type: string
     *                             brand:
     *                               type: string
     *                             model:
     *                               type: string
     *                             year:
     *                               type: integer
     *                             color:
     *                               type: string
     *                             status:
     *                               type: string
     *                             usageTimes:
     *                               type: integer
     *                               description: Number of times the car was used by the driver.
     *                             totalOdometerChange:
     *                               type: number
     *                               description: Total odometer change for the car used by the driver.
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
