import { prisma } from "../../config/prisma";
import { Request, Response } from "express";
import {
    ManagerReport
} from "../../schemas/reportInterface";

export const getAllManagersReport = async (req: Request, res: Response) => {
    try {
        const managers = await prisma.manager.findMany({
            include: {
                events: {
                    include: {
                        driver: true,
                        car: true,
                    },
                },
            },
        });

        const drivers = await prisma.driver.findMany({
            where: {
                events: {
                    some: {
                        managerId: {
                            in: managers.map((manager) => manager.id),
                        },
                    },
                },
            },
            include: {
                events: {
                    include: {
                        car: true,
                    },
                },

            },
        });

        const cars = await prisma.car.findMany({
            where: {
                events: {
                    some: {
                        managerId: {
                            in: managers.map((manager) => manager.id),
                        },
                    },
                },
            },
            include: {
                events: {
                    include: {
                        driver: true,
                    },
                },
            },
        });

        const managersReport: ManagerReport[] = managers.map((manager) => {
            return {
                id: manager.id,
                name: manager.name,
                email: manager.email,
                createdAt: manager.createdAt,
                updatedAt: manager.updatedAt,
                drivers: drivers
                    .filter((driver) =>
                        driver.events.some((event) => event.managerId === manager.id)
                    )
                    .map((driver) => ({
                        id: driver.id,
                        name: driver.name,
                        phone: driver.phone,
                        license: driver.license,
                    })),

                cars: cars
                    .filter((car) =>
                        car.events.some((event) => event.managerId === manager.id)
                    )
                    .map((car) => ({
                        id: car.id,
                        renavam: car.renavam,
                        chassis: car.chassis,
                        plate: car.plate,
                        brand: car.brand,
                        model: car.model,
                        year: car.year,
                        color: car.color,
                        status: car.status,
                    })),
                events: manager.events.map((event) => ({
                    id: event.id,
                    eventType: event.eventType,
                    odometer: event.odometer,
                    isActive: event.isActive,
                    status: event.status,
                    createdAt: event.createdAt,
                    endedAt: event.endedAt,
                    managerId: event.managerId,
                    driverId: event.driver.id,
                    carId: event.car.id,
                    checkoutEventId: event.checkoutEventId || null,
            })),
        }});

        res.json(managersReport);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
