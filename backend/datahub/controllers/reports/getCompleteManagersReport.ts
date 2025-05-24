import { prisma } from "../../config/prisma";
import { Request, Response } from "express";

interface ManagerReport {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    drivers: any[];
    deletedDrivers: any[];
    cars: any[];
    deletedCars: any[];
    events: any[];
    deletedEvents: any[];
    summary: {
        totalDrivers: number;
        totalDeletedDrivers: number;
        totalCars: number;
        totalDeletedCars: number;
        totalEvents: number;
        totalDeletedEvents: number;
    };
}

export const getCompleteManagersReport = async (
    req: Request,
    res: Response
) => {
    try {
        // Buscar todos os gestores
        const managers = await prisma.manager.findMany();
        console.log(`Total de gestores encontrados: ${managers.length}`);

        // Debugging: verificar se há algum motorista marcado como excluído no sistema
        const allDeletedDrivers = await prisma.driver.findMany({
            where: {
                deletedById: { not: null },
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

        // Array para armazenar o relatório completo
        const completeReport: ManagerReport[] = [];

        // Para cada gestor, buscar dados completos incluindo itens excluídos
        for (const manager of managers) {
            console.log(`Processando gestor: ${manager.name} (${manager.id})`);

            // Motoristas ativos
            const activeDrivers = await prisma.driver.findMany({
                where: {
                    managerId: manager.id,
                    deletedById: null,
                },
            });

            // Motoristas excluídos - busca geral, não apenas por managerId pois o motorista pode ter sido gerenciado por outro gestor
            const deletedDrivers = await prisma.driver.findMany({
                where: {
                    OR: [
                        { managerId: manager.id, deletedById: { not: null } },
                        { deletedById: manager.id },
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

            // Carros ativos
            const activeCars = await prisma.car.findMany({
                where: {
                    managerId: manager.id,
                    deletedById: null,
                },
            });

            // Carros excluídos
            const deletedCars = await prisma.car.findMany({
                where: {
                    OR: [
                        { managerId: manager.id, deletedById: { not: null } },
                        { deletedById: manager.id },
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

            // Eventos ativos
            const activeEvents = await prisma.event.findMany({
                where: {
                    managerId: manager.id,
                    deletedById: null,
                },
                include: {
                    driver: true,
                    car: true,
                },
            });

            // Eventos excluídos
            const deletedEvents = await prisma.event.findMany({
                where: {
                    OR: [
                        { managerId: manager.id, deletedById: { not: null } },
                        { deletedById: manager.id },
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

            // Log para debug
            console.log(`Gestor ${manager.name}:
                - ${activeDrivers.length} motoristas ativos
                - ${deletedDrivers.length} motoristas excluídos
                - ${activeCars.length} carros ativos
                - ${deletedCars.length} carros excluídos
                - ${activeEvents.length} eventos ativos
                - ${deletedEvents.length} eventos excluídos`);

            // Construir o relatório do gestor
            const managerReport: ManagerReport = {
                id: manager.id,
                name: manager.name,
                email: manager.email,
                createdAt: manager.createdAt,
                updatedAt: manager.updatedAt,
                // Motoristas ativos
                drivers: activeDrivers.map((driver) => ({
                    id: driver.id,
                    name: driver.name,
                    phone: driver.phone,
                    license: driver.license,
                    isAvailable: driver.isAvailable,
                    status: "ACTIVE",
                })),
                // Motoristas excluídos
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
                })),
                // Carros ativos
                cars: activeCars.map((car) => ({
                    id: car.id,
                    renavam: car.renavam,
                    chassis: car.chassis,
                    plate: car.plate,
                    brand: car.brand,
                    model: car.model,
                    year: car.year,
                    color: car.color,
                    status: car.status,
                    isAvailable: car.isAvailable,
                })),
                // Carros excluídos
                deletedCars: deletedCars.map((car: any) => ({
                    id: car.id,
                    renavam: car.renavam,
                    chassis: car.chassis,
                    plate: car.plate,
                    brand: car.brand,
                    model: car.model,
                    year: car.year,
                    color: car.color,
                    deletedAt: car.deletedAt,
                    deletedById: car.deletedById,
                    deletedByName: car.deletedBy ? car.deletedBy.name : null,
                    status: "DELETED",
                })),
                // Eventos ativos
                events: activeEvents.map((event) => ({
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
                    driverName: event.driver.name,
                    carInfo: `${event.car.brand} ${event.car.model} (${event.car.plate})`,
                    checkoutEventId: event.checkoutEventId || null,
                })),
                // Eventos excluídos
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
                    carInfo: `${event.car.brand} ${event.car.model} (${event.car.plate})`,
                })),
                // Resumo das informações
                summary: {
                    totalDrivers: activeDrivers.length,
                    totalDeletedDrivers: deletedDrivers.length,
                    totalCars: activeCars.length,
                    totalDeletedCars: deletedCars.length,
                    totalEvents: activeEvents.length,
                    totalDeletedEvents: deletedEvents.length,
                },
            };

            completeReport.push(managerReport);
        }

        // Calcular estatísticas globais
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
        });
    } catch (error) {
        console.error("Erro no relatório completo de gestores:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
