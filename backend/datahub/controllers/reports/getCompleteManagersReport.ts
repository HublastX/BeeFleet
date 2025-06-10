import { prisma } from "../../config/prisma";
import { Request, Response } from "express";
import { ManagerGlobalReport } from "../../schemas/reportInterface";

export const getCompleteManagersReport = async (
    req: Request,
    res: Response
) => {
    try {
        const { startDate, endDate } = req.query;

        let dateFilter = {};
        if (startDate && endDate) {
            const endDateTime = new Date(endDate as string);
            endDateTime.setHours(23, 59, 59, 999);

            dateFilter = {
                createdAt: {
                    gte: new Date(startDate as string),
                    lte: endDateTime,
                },
            };
        } else if (startDate) {
            const startDateTime = new Date(startDate as string);
            const endDateTime = new Date(startDate as string);
            endDateTime.setHours(23, 59, 59, 999);

            dateFilter = {
                createdAt: {
                    gte: startDateTime,
                    lte: endDateTime,
                },
            };
        } else if (endDate) {
            const endDateTime = new Date(endDate as string);
            endDateTime.setHours(23, 59, 59, 999);

            dateFilter = {
                createdAt: {
                    lte: endDateTime,
                },
            };
        }

        const managers = await prisma.manager.findMany();
        console.log(`Total de gestores encontrados: ${managers.length}`);

        const allDeletedDrivers = await prisma.driver.findMany({
            where: {
                deletedById: { not: null },
                ...dateFilter,
            },
            include: {
                manager: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                deletedBy: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        console.log(
            `Debugging - Total de motoristas excluídos no sistema: ${allDeletedDrivers.length}`
        );
        if (allDeletedDrivers.length > 0) {
            allDeletedDrivers.forEach((driver) => {
                const deletedByName = driver.deletedBy
                    ? driver.deletedBy.name
                    : "Desconhecido";
                console.log(
                    `Motorista excluído encontrado: ID=${driver.id}, nome=${driver.name}, deletedById=${driver.deletedById}, deletedBy=${deletedByName}`
                );
            });
        }

        const completeReport: ManagerGlobalReport[] = [];

        for (const manager of managers) {
            console.log(`Processando gestor: ${manager.name} (${manager.id})`);

            const activeDrivers = await prisma.driver.findMany({
                where: {
                    managerId: manager.id,
                    deletedById: null,
                    ...dateFilter,
                },
            });

            const deletedDrivers = await prisma.driver.findMany({
                where: {
                    OR: [
                        {
                            managerId: manager.id,
                            deletedById: { not: null },
                            ...dateFilter,
                        },
                        { deletedById: manager.id, ...dateFilter },
                    ],
                },
                include: {
                    manager: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                    deletedBy: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            });

            console.log(
                `Gestor ${manager.id} deletedDrivers encontrados: ${deletedDrivers.length}`
            );
            deletedDrivers.forEach((driver) => {
                const deletedByName = driver.deletedBy
                    ? driver.deletedBy.name
                    : "Desconhecido";
                console.log(
                    `  - Driver: id=${driver.id}, name=${driver.name}, deletedById=${driver.deletedById}, deletedBy=${deletedByName}`
                );
            });

            const activeCars = await prisma.car.findMany({
                where: {
                    managerId: manager.id,
                    deletedById: null,
                    ...dateFilter,
                },
            });

            const deletedCars = await prisma.car.findMany({
                where: {
                    OR: [
                        {
                            managerId: manager.id,
                            deletedById: { not: null },
                            ...dateFilter,
                        },
                        { deletedById: manager.id, ...dateFilter },
                    ],
                },
                include: {
                    manager: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                    deletedBy: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            });

            const activeEvents = await prisma.event.findMany({
                where: {
                    managerId: manager.id,
                    deletedById: null,
                    ...dateFilter,
                },
                include: {
                    driver: true,
                    car: true,
                },
            });

            const checkoutEvents = await prisma.event.findMany({
                where: {
                    managerId: manager.id,
                    eventType: "CHECKOUT",
                    deletedById: null,
                    ...dateFilter,
                },
            });

            const deletedEvents = await prisma.event.findMany({
                where: {
                    OR: [
                        {
                            managerId: manager.id,
                            deletedById: { not: null },
                            ...dateFilter,
                        },
                        { deletedById: manager.id, ...dateFilter },
                    ],
                },
                include: {
                    driver: true,
                    car: true,
                    manager: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                    deletedBy: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            });

            const deletedCheckoutEvents = await prisma.event.findMany({
                where: {
                    OR: [
                        {
                            managerId: manager.id,
                            eventType: "CHECKOUT",
                            deletedById: { not: null },
                            ...dateFilter,
                        },
                        {
                            deletedById: manager.id,
                            eventType: "CHECKOUT",
                            ...dateFilter,
                        },
                    ],
                },
            });

            const allCheckoutEvents = [
                ...checkoutEvents,
                ...deletedCheckoutEvents,
            ];

            console.log(`Gestor ${manager.name}:
                - ${activeDrivers.length} motoristas ativos
                - ${deletedDrivers.length} motoristas excluídos
                - ${activeCars.length} carros ativos
                - ${deletedCars.length} carros excluídos
                - ${activeEvents.length} eventos ativos
                - ${deletedEvents.length} eventos excluídos`);

            const managerGlobalReport: ManagerGlobalReport = {
                id: manager.id,
                name: manager.name,
                email: manager.email,
                createdAt: manager.createdAt,
                updatedAt: manager.updatedAt,
                drivers: activeDrivers.map((driver) => ({
                    id: driver.id,
                    name: driver.name,
                    phone: driver.phone,
                    license: driver.license,
                    isAvailable: driver.isAvailable,
                    status: "ACTIVE",
                    createdAt: driver.createdAt,
                    updatedAt: driver.updatedAt,
                })),
                deletedDrivers: deletedDrivers.map((driver: any) => ({
                    id: driver.id,
                    name: driver.name,
                    phone: driver.phone,
                    license: driver.license,
                    deletedAt: driver.deletedAt,
                    deletedById: driver.deletedById,
                    deletedByName: driver.deletedBy
                        ? driver.deletedBy.name
                        : null,
                    status: "DELETED",
                    createdAt: driver.createdAt,
                    updatedAt: driver.updatedAt,
                })),
                cars: activeCars.map((car) => ({
                    id: car.id,
                    renavam: car.renavam,
                    chassis: car.chassis,
                    plate: car.plate,
                    brand: car.brand,
                    model: car.model,
                    odometer: car.odometer,
                    year: car.year,
                    color: car.color,
                    status: car.status,
                    isAvailable: car.isAvailable,
                    createdAt: car.createdAt,
                    updatedAt: car.updatedAt,
                })),
                deletedCars: deletedCars.map((car: any) => ({
                    id: car.id,
                    renavam: car.renavam,
                    chassis: car.chassis,
                    plate: car.plate,
                    brand: car.brand,
                    model: car.model,
                    year: car.year,
                    color: car.color,
                    odometer: car.odometer,
                    deletedAt: car.deletedAt,
                    deletedById: car.deletedById,
                    deletedByName: car.deletedBy ? car.deletedBy.name : null,
                    status: "DELETED",
                    createdAt: car.createdAt,
                    updatedAt: car.updatedAt,
                })),
                events: activeEvents.map((event) => ({
                    id: event.id,
                    eventType: event.eventType,
                    odometer: event.odometer,
                    isActive: event.isActive,
                    status: event.status,
                    createdAt: event.createdAt,
                    endedAt: event.endedAt,
                    checkoutCreate:
                        event.eventType === "RETURN" && event.checkoutEventId
                            ? allCheckoutEvents.find(
                                  (checkout) =>
                                      checkout.id === event.checkoutEventId
                              )?.createdAt || "ainda não foi finalizado"
                            : 0,
                    managerId: event.managerId,
                    driverId: event.driver.id,
                    carId: event.car.id,
                    driverName: event.driver.name,
                    driverPhone: event.driver.phone,
                    carInfo: `${event.car.brand} ${event.car.model} (${event.car.plate})`,
                    checkoutEventId: event.checkoutEventId || null,
                    distanceTraveled:
                        event.eventType === "RETURN" && event.checkoutEventId
                            ? event.odometer -
                              (allCheckoutEvents.find(
                                  (checkout) =>
                                      checkout.id === event.checkoutEventId
                              )?.odometer || 0)
                            : 0,
                })),
                deletedEvents: deletedEvents.map((event: any) => ({
                    id: event.id,
                    eventType: event.eventType,
                    odometer: event.odometer,
                    status: "DELETED",
                    createdAt: event.createdAt,
                    endedAt: event.endedAt,
                    deletedAt: event.deletedAt,
                    deletedById: event.deletedById,
                    deletedByName: event.deletedBy
                        ? event.deletedBy.name
                        : null,
                    managerId: event.managerId,
                    driverId: event.driver.id,
                    carId: event.car.id,
                    driverName: event.driver.name,
                    driverPhone: event.driver.phone,
                    carInfo: `${event.car.brand} ${event.car.model} (${event.car.plate})`,
                    distanceTraveled:
                        event.eventType === "RETURN" && event.checkoutEventId
                            ? event.odometer -
                              (allCheckoutEvents.find(
                                  (checkout) =>
                                      checkout.id === event.checkoutEventId
                              )?.odometer || 0)
                            : 0,
                })),
                summary: {
                    totalDrivers: activeDrivers.length,
                    totalDeletedDrivers: deletedDrivers.length,
                    totalCars: activeCars.length,
                    totalDeletedCars: deletedCars.length,
                    totalEvents: activeEvents.length,
                    totalDeletedEvents: deletedEvents.length,
                },
            };

            completeReport.push(managerGlobalReport);
        }

        const globalStats = {
            totalManagers: completeReport.length,
            totalDrivers: completeReport.reduce(
                (sum, manager) => sum + manager.drivers.length,
                0
            ),
            totalDeletedDrivers: completeReport.reduce(
                (sum, manager) => sum + manager.deletedDrivers.length,
                0
            ),
            totalCars: completeReport.reduce(
                (sum, manager) => sum + manager.cars.length,
                0
            ),
            totalDeletedCars: completeReport.reduce(
                (sum, manager) => sum + manager.deletedCars.length,
                0
            ),
            totalEvents: completeReport.reduce(
                (sum, manager) => sum + manager.events.length,
                0
            ),
            totalDeletedEvents: completeReport.reduce(
                (sum, manager) => sum + manager.deletedEvents.length,
                0
            ),
        };

        console.log(
            `Relatório final: ${completeReport.length} gestores processados`
        );

        res.json({
            managers: completeReport,
            globalStats,
            filters: {
                startDate: startDate || null,
                endDate: endDate || null,
            },
        });
    } catch (error) {
        console.error("Erro no relatório completo de gestores:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
