export const DOCS_REPORT_EVENT_GET_ALL = {
    /**
     * @swagger
     * /api/report/all-events:
     *   get:
     *     summary: Lista todos os eventos por um relatório
     *     description: Obtém um relatório de todos os eventos, incluindo detalhes do motorista e do carro.
     *     tags:
     *       - Reports
     *     responses:
     *       200:
     *         description: A list of events with detailed information.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 totalEvents:
     *                   type: integer
     *                   description: Total number of events.
     *                   example: 5
     *                 events:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       id:
     *                         type: string
     *                         description: The unique identifier of the event.
     *                         example: "12345"
     *                       eventType:
     *                         type: string
     *                         description: The type of the event.
     *                         example: "Maintenance"
     *                       odometer:
     *                         type: integer
     *                         description: The odometer reading at the time of the event.
     *                         example: 12000
     *                       isActive:
     *                         type: boolean
     *                         description: Whether the event is currently active.
     *                         example: true
     *                       status:
     *                         type: string
     *                         description: The status of the event.
     *                         example: "Completed"
     *                       createdAt:
     *                         type: string
     *                         format: date-time
     *                         description: The creation timestamp of the event.
     *                         example: "2025-05-21T10:00:00Z"
     *                       endedAt:
     *                         type: string
     *                         format: date-time
     *                         description: The end timestamp of the event.
     *                         example: "2025-05-21T12:00:00Z"
     *                       managerId:
     *                         type: string
     *                         description: The ID of the manager responsible for the event.
     *                         example: "manager123"
     *                       driverId:
     *                         type: string
     *                         description: The ID of the driver associated with the event.
     *                         example: "driver456"
     *                       carId:
     *                         type: string
     *                         description: The ID of the car associated with the event.
     *                         example: "car789"
     *                       checkoutEventId:
     *                         type: string
     *                         nullable: true
     *                         description: The ID of the checkout event, if applicable.
     *                         example: "checkout123"
     *                       driverDetails:
     *                         type: object
     *                         properties:
     *                           name:
     *                             type: string
     *                             description: The name of the driver.
     *                             example: "John Doe"
     *                           phone:
     *                             type: string
     *                             description: The phone number of the driver.
     *                             example: "+123456789"
     *                           license:
     *                             type: string
     *                             description: The driver's license number.
     *                             example: "ABC123456"
     *                       carDetails:
     *                         type: object
     *                         properties:
     *                           renavam:
     *                             type: string
     *                             description: The RENAVAM of the car.
     *                             example: "987654321"
     *                           chassis:
     *                             type: string
     *                             description: The chassis number of the car.
     *                             example: "1HGCM82633A123456"
     *                           plate:
     *                             type: string
     *                             description: The license plate of the car.
     *                             example: "XYZ-1234"
     *                           brand:
     *                             type: string
     *                             description: The brand of the car.
     *                             example: "Toyota"
     *                           model:
     *                             type: string
     *                             description: The model of the car.
     *                             example: "Corolla"
     *                           year:
     *                             type: integer
     *                             description: The manufacturing year of the car.
     *                             example: 2020
     *                           color:
     *                             type: string
     *                             description: The color of the car.
     *                             example: "White"
     *                           status:
     *                             type: string
     *                             description: The status of the car.
     *                             example: "Available"
     *       500:
     *         description: Internal server error.
     */
};
