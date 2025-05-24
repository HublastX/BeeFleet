export const DOCS_REPORT_DRIVER_GET_ALL_USAGE = {
    /**
     * @swagger
     * /api/report/all-drivers:
     *   get:
     *     tags:
     *       - Reports
     *     summary: Lista o uso de todos os motoristas por um relatório
     *     description: Obtém um relatório detalhado do uso de todos os motoristas, incluindo informações sobre os carros utilizados.
     *     security:
     *       - bearerAuth: []
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
     *                         description: Unique identifier of the driver.
     *                       name:
     *                         type: string
     *                         description: Name of the driver.
     *                       phone:
     *                         type: string
     *                         description: Phone number of the driver.
     *                       license:
     *                         type: string
     *                         description: Driver's license number.
     *                       createdAt:
     *                         type: string
     *                         format: date-time
     *                         description: Date and time when the driver was created in the system.
     *                       totalUsageTimes:
     *                         type: integer
     *                         description: Total number of times the driver used cars.
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
     *                               description: Unique identifier of the car.
     *                             renavam:
     *                               type: string
     *                               description: RENAVAM of the car.
     *                             chassis:
     *                               type: string
     *                               description: Chassis number of the car.
     *                             plate:
     *                               type: string
     *                               description: License plate of the car.
     *                             brand:
     *                               type: string
     *                               description: Brand of the car.
     *                             model:
     *                               type: string
     *                               description: Model of the car.
     *                             year:
     *                               type: integer
     *                               description: Manufacturing year of the car.
     *                             color:
     *                               type: string
     *                               description: Color of the car.
     *                             status:
     *                               type: string
     *                               description: Current status of the car.
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
     *                   description: Error message describing the invalid request.
     *       500:
     *         description: Internal server error.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   description: Error message describing the server issue.
     */
};
