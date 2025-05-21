export const DOCS_REPORT_MANAGER_GET_ALL = {
    /**
     * @swagger
     * /api/report/all-managers:
     *   get:
     *     summary: Lista todos os gestores por um relatório
     *     description: Obtém um relatório de todos dos gestores
     *     tags:
     *       - Reports
     *     responses:
     *       200:
     *         description: A list of managers with their associated data.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: string
     *                     description: The unique identifier of the manager.
     *                   name:
     *                     type: string
     *                     description: The name of the manager.
     *                   email:
     *                     type: string
     *                     description: The email of the manager.
     *                   createdAt:
     *                     type: string
     *                     format: date-time
     *                     description: The creation date of the manager record.
     *                   updatedAt:
     *                     type: string
     *                     format: date-time
     *                     description: The last update date of the manager record.
     *                   drivers:
     *                     type: array
     *                     items:
     *                       type: object
     *                       properties:
     *                         id:
     *                           type: string
     *                           description: The unique identifier of the driver.
     *                         name:
     *                           type: string
     *                           description: The name of the driver.
     *                         phone:
     *                           type: string
     *                           description: The phone number of the driver.
     *                         license:
     *                           type: string
     *                           description: The license of the driver.
     *                   cars:
     *                     type: array
     *                     items:
     *                       type: object
     *                       properties:
     *                         id:
     *                           type: string
     *                           description: The unique identifier of the car.
     *                         renavam:
     *                           type: string
     *                           description: The RENAVAM of the car.
     *                         chassis:
     *                           type: string
     *                           description: The chassis number of the car.
     *                         plate:
     *                           type: string
     *                           description: The license plate of the car.
     *                         brand:
     *                           type: string
     *                           description: The brand of the car.
     *                         model:
     *                           type: string
     *                           description: The model of the car.
     *                         year:
     *                           type: integer
     *                           description: The manufacturing year of the car.
     *                         color:
     *                           type: string
     *                           description: The color of the car.
     *                         status:
     *                           type: string
     *                           description: The status of the car.
     *                         events:
     *                           type: array
     *                           items:
     *                             type: object
     *                             properties:
     *                               id:
     *                                 type: string
     *                                 description: The unique identifier of the event.
     *                               eventType:
     *                                 type: string
     *                                 description: The type of the event.
     *                               odometer:
     *                                 type: integer
     *                                 description: The odometer reading during the event.
     *                               isActive:
     *                                 type: boolean
     *                                 description: Whether the event is active.
     *                               status:
     *                                 type: string
     *                                 description: The status of the event.
     *                               createdAt:
     *                                 type: string
     *                                 format: date-time
     *                                 description: The creation date of the event.
     *                               endedAt:
     *                                 type: string
     *                                 format: date-time
     *                                 description: The end date of the event.
     *                               managerId:
     *                                 type: string
     *                                 description: The ID of the manager associated with the event.
     *                               driverId:
     *                                 type: string
     *                                 description: The ID of the driver associated with the event.
     *                               carId:
     *                                 type: string
     *                                 description: The ID of the car associated with the event.
     *                               checkoutEventId:
     *                                 type: string
     *                                 nullable: true
     *                                 description: The ID of the checkout event, if applicable.
     *       500:
     *         description: Internal server error.
     */
};
