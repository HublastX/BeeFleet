import { prisma } from "../../config/prisma";
import { Request, Response } from "express";
import {
    Car,
    CarReport,
    DriverUsageDetail,
} from "../../schemas/reportInterface";

export const getAllCarsUsageReport = async (req: Request, res: Response) => {
    try {
        const cars: Car[] = await prisma.car.findMany({
            include: {
                events: {
                    where: { eventType: "RETURN" },
                    include: { driver: true },
                    orderBy: { createdAt: "desc" },
                },
            },
        });

        const carsReport: CarReport[] = cars.map((car) => {
            const totalUsageTimes = car.events.length;

            const uniqueDrivers = new Set(
                car.events.map((event) => event.driver.id)
            );

            const totalOdometerChange = car.events.reduce((acc, event) => {
                return acc + event.odometer;
            }, 0);

            const lastUsed =
                car.events.length > 0 ? car.events[0].createdAt : null;

            const driverUsageDetails: DriverUsageDetail[] = Array.from(
                uniqueDrivers
            ).map((driverId) => {
                const driverEvents = car.events.filter(
                    (event) => event.driver.id === driverId
                );
                const driver = driverEvents[0].driver;

                return {
                    driverId: driver.id,
                    name: driver.name,
                    phone: driver.phone,
                    license: driver.license,
                    totalUsageTimes: driverEvents.length,
                    totalOdometerChange: driverEvents.reduce(
                        (acc, event) => acc + event.odometer,
                        0
                    ),
                };
            });

            return {
                id: car.id,
                renavam: car.renavam,
                chassis: car.chassis,
                plate: car.plate,
                brand: car.brand,
                model: car.model,
                year: car.year,
                color: car.color,
                status: car.status,
                totalUsageTimes,
                totalOdometerChange,
                uniqueDriversUsed: uniqueDrivers.size,
                lastUsed,
                driverUsageDetails,
            };
        });

        res.json({
            totalCars: carsReport.length,
            cars: carsReport,
        });
    } catch (error: any) {
        console.error("All Cars Usage Report error:", error);
        res.status(500).json({ error: error.message });
    }
};
