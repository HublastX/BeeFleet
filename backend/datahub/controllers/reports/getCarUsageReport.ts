import { prisma } from "../../config/prisma";
import { parseISO } from "date-fns";
import {
    CarUsageReportRequest,
    CarUsageReportResponse,
    CarUsage,
} from "../../schemas/reportInterface";

export const getCarUsageReport = async (req, res) => {
    try {
        const { startDate, endDate, carId, managerId } =
            req.query as CarUsageReportRequest;

        // Validação de parâmetros obrigatórios
        if (!startDate || !endDate) {
            return res
                .status(400)
                .json({ error: "Start and end dates are required" });
        }

        const parsedStartDate = parseISO(startDate);
        const parsedEndDate = parseISO(endDate);

        // Condição de filtro para a consulta
        const whereCondition = {
            managerId,
            eventType: { equals: "RETURN" as const },
            createdAt: {
                gte: parsedStartDate,
                lte: parsedEndDate,
            },
            ...(carId && { carId }),
        };

        // Consulta ao banco de dados
        const events = await prisma.event.findMany({
            where: whereCondition,
            include: {
                car: true,
                driver: true,
                manager: true,
            },
            orderBy: {
                createdAt: "asc",
            },
        });

        // Processamento dos dados
        const carsMap = new Map<string, CarUsage>();

        events.forEach((event) => {
            if (carsMap.has(event.carId)) {
                const car = carsMap.get(event.carId)!;
                car.usageCount++;
                car.totalOdometer += event.odometer;
            } else {
                carsMap.set(event.carId, {
                    carId: event.carId,
                    renavam: event.car.renavam,
                    chassis: event.car.chassis,
                    plate: event.car.plate,
                    brand: event.car.brand,
                    model: event.car.model,
                    usageCount: 1,
                    totalOdometer: event.odometer,
                });
            }
        });

        const carsArray: CarUsage[] = Array.from(carsMap.values());

        // Construção do relatório
        const report: CarUsageReportResponse = {
            totalEvents: events.length,
            cars: carsArray,
            startDate: parsedStartDate,
            endDate: parsedEndDate,
        };

        res.json(report);
    } catch (error) {
        console.error("Car usage report error:", error);
        res.status(500).json({ error: error.message });
    }
};
