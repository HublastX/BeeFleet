import { prisma } from "../../config/prisma";
import { Request, Response } from "express";
import {
    ManagerReport
} from "../../schemas/reportInterface";

export const getAllManagersReport = async (
    req: Request,
    res: Response
) => {
    try {
        const managers = await prisma.manager.findMany();

        console.log(`Total de gestores encontrados: ${managers.length}`);

        const managersReport: ManagerReport[] = [];

        for (const manager of managers) {
            console.log(`Processando gestor: ${manager.name} (${manager.id})`);

            const drivers = await prisma.driver.findMany({
                where: {
                    managerId: manager.id,
                },
            });

            console.log(
                `Motoristas encontrados para ${manager.name}: ${drivers.length}`
            );

            const cars = await prisma.car.findMany({
                where: {
                    managerId: manager.id,
                },
            });

            console.log(
                `Carros encontrados para ${manager.name}: ${cars.length}`
            );

            const events = await prisma.event.findMany({
                where: {
                    managerId: manager.id,
                },
                include: {
                    driver: true,
                    car: true,
                },
            });

            console.log(
                `Eventos encontrados para ${manager.name}: ${events.length}`
            );

            if (drivers.length === 0) {
                console.log(
                    "ATENÇÃO: Nenhum motorista encontrado para este gestor, verificando manualmente..."
                );
                const manualDriverCheck = await prisma.$queryRaw`
                    SELECT * FROM Driver WHERE managerId = ${manager.id}
                `;
                console.log(
                    "Resultado da verificação manual:",
                    manualDriverCheck
                );
            }

            managersReport.push({
                id: manager.id,
                name: manager.name,
                email: manager.email,
                createdAt: manager.createdAt,
                updatedAt: manager.updatedAt,
                drivers: drivers.map((driver) => ({
                    id: driver.id,
                    name: driver.name,
                    phone: driver.phone,
                    license: driver.license,
                })),
                cars: cars.map((car) => ({
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
                events: events.map((event) => ({
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
            });
        }

        console.log(
            `Relatório final: ${managersReport.length} gestores processados`
        );

        res.json(managersReport);
    } catch (error) {
        console.error("Erro no relatório de gestores:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
