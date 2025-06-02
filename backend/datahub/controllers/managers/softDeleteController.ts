import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const softDeleteCar = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { managerId, reason } = req.body;

        if (!id || !managerId) {
            return res
                .status(400)
                .json({ error: "ID do carro e ID do gestor são obrigatórios" });
        }

        const car = await prisma.car.findUnique({
            where: { id },
            include: {
                manager: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        if (!car) {
            return res.status(404).json({ error: "Carro não encontrado" });
        }

        if (car.deletedById) {
            return res.status(400).json({
                error: "Este carro já foi excluído",
                deletedAt: car.deletedAt,
            });
        }

        const deletedCar = await prisma.car.update({
            where: { id },
            data: {
                deletedAt: new Date(),
                deletedById: managerId,
                isAvailable: false,
                status: "AVAILABLE",
            },
        });

        console.log(
            `Carro ocultado (soft delete): ID=${id}, deletedById=${managerId}, deletedAt=${new Date()}, reason=${
                reason || "Não informado"
            }`
        );

        return res.status(200).json({
            message: `Carro ${car.brand} ${car.model} (${car.plate}) foi ocultado com sucesso e não aparecerá mais nas listagens normais, mas ainda estará visível em relatórios.`,
            success: true,
            carId: id,
            carInfo: `${car.brand} ${car.model} (${car.plate})`,
            deletedById: managerId,
            deletedAt: deletedCar.deletedAt,
            canBeRestored: true,
        });
    } catch (error) {
        console.error("Erro ao ocultar carro:", error);
        return res.status(500).json({ error: "Erro ao ocultar carro" });
    }
};

// Controlador para soft delete de motoristas
export const softDeleteDriver = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { managerId, reason } = req.body;

        if (!id || !managerId) {
            return res.status(400).json({
                error: "ID do motorista e ID do gestor são obrigatórios",
            });
        }

        // Verifica se o motorista existe
        const driver = await prisma.driver.findUnique({
            where: { id },
        });

        if (!driver) {
            return res.status(404).json({ error: "Motorista não encontrado" });
        }

        // Verifica se o motorista já foi excluído
        if (driver.deletedById) {
            return res.status(400).json({
                error: "Este motorista já foi ocultado",
                deletedAt: driver.deletedAt,
            });
        }

        // Atualiza o motorista (soft delete)
        const deletedDriver = await prisma.driver.update({
            where: { id },
            data: {
                deletedAt: new Date(),
                deletedById: managerId,
                isAvailable: false,
            },
        });

        console.log(
            `Motorista ocultado (soft delete): ID=${id}, nome=${
                driver.name
            }, deletedById=${managerId}, deletedAt=${new Date()}, reason=${
                reason || "Não informado"
            }`
        );

        return res.status(200).json({
            message: `Motorista ${driver.name} foi ocultado com sucesso e não aparecerá mais nas listagens normais, mas ainda estará visível em relatórios.`,
            success: true,
            driverId: id,
            driverName: driver.name,
            deletedById: managerId,
            deletedAt: deletedDriver.deletedAt,
            canBeRestored: true,
        });
    } catch (error) {
        console.error("Erro ao ocultar motorista:", error);
        return res.status(500).json({ error: "Erro ao ocultar motorista" });
    }
};

// Controlador para soft delete de eventos
export const softDeleteEvent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { managerId, reason } = req.body;

        if (!id || !managerId) {
            return res.status(400).json({
                error: "ID do evento e ID do gestor são obrigatórios",
            });
        }

        // Verifica se o evento existe
        const event = await prisma.event.findUnique({
            where: { id },
            include: {
                driver: true,
                car: true,
            },
        });

        if (!event) {
            return res.status(404).json({ error: "Evento não encontrado" });
        }

        // Verifica se o evento já foi excluído
        if (event.deletedById) {
            return res.status(400).json({
                error: "Este evento já foi ocultado",
                deletedAt: event.deletedAt,
            });
        }

        // Atualiza o evento (soft delete)
        const deletedEvent = await prisma.event.update({
            where: { id },
            data: {
                deletedAt: new Date(),
                deletedById: managerId,
                isActive: false,
                status: "CANCELLED",
            },
        });

        const eventInfo = `${event.eventType} - Motorista: ${event.driver.name}, Carro: ${event.car.brand} ${event.car.model}`;
        console.log(
            `Evento ocultado (soft delete): ID=${id}, tipo=${
                event.eventType
            }, deletedById=${managerId}, deletedAt=${new Date()}, reason=${
                reason || "Não informado"
            }`
        );

        return res.status(200).json({
            message: `Evento ${eventInfo} foi ocultado com sucesso e não aparecerá mais nas listagens normais, mas ainda estará visível em relatórios.`,
            success: true,
            eventId: id,
            eventInfo: eventInfo,
            deletedById: managerId,
            deletedAt: deletedEvent.deletedAt,
            canBeRestored: true,
        });
    } catch (error) {
        console.error("Erro ao ocultar evento:", error);
        return res.status(500).json({ error: "Erro ao ocultar evento" });
    }
};

// Controlador para soft delete de managers
export const softDeleteManager = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { adminId, reason } = req.body;

        if (!id || !adminId) {
            return res.status(400).json({
                error: "ID do gestor a ser excluído e ID do administrador são obrigatórios",
            });
        }

        // Verifica se o gestor a ser excluído existe
        const manager = await prisma.manager.findUnique({
            where: { id },
        });

        if (!manager) {
            return res.status(404).json({ error: "Gestor não encontrado" });
        }

        // Verifica se o gestor já foi excluído
        if (manager.deletedById) {
            return res.status(400).json({
                error: "Este gestor já foi ocultado",
                deletedAt: manager.deletedAt,
            });
        }

        // Verifica se o administrador tem permissão (deve ser admin)
        const admin = await prisma.manager.findUnique({
            where: { id: adminId },
        });

        if (!admin || !admin.isAdmin) {
            return res.status(403).json({
                error: "Apenas administradores podem ocultar gestores",
            });
        }

        // Atualiza o gestor (soft delete)
        const deletedManager = await prisma.manager.update({
            where: { id },
            data: {
                deletedAt: new Date(),
                deletedById: adminId,
            },
        });

        console.log(
            `Gestor ocultado (soft delete): ID=${id}, nome=${
                manager.name
            }, deletedById=${adminId}, deletedAt=${new Date()}, reason=${
                reason || "Não informado"
            }`
        );

        return res.status(200).json({
            message: `Gestor ${manager.name} foi ocultado com sucesso e não aparecerá mais nas listagens normais, mas ainda estará visível em relatórios.`,
            success: true,
            managerId: id,
            managerName: manager.name,
            deletedById: adminId,
            deletedAt: deletedManager.deletedAt,
            canBeRestored: true,
        });
    } catch (error) {
        console.error("Erro ao ocultar gestor:", error);
        return res.status(500).json({ error: "Erro ao ocultar gestor" });
    }
};

// Controlador para restaurar itens ocultados (remover soft delete)
export const restoreDeletedItem = async (req: Request, res: Response) => {
    try {
        const { itemType, itemId } = req.params;
        const { managerId } = req.body;

        if (!itemType || !itemId || !managerId) {
            return res.status(400).json({
                error: "Tipo de item, ID do item e ID do gestor são obrigatórios",
            });
        }

        let result;
        let message;

        switch (itemType) {
            case "car":
                result = await prisma.car.update({
                    where: { id: itemId },
                    data: {
                        deletedAt: null,
                        deletedById: null,
                        isAvailable: true,
                        // Não alteramos o status aqui, pois pode precisar de uma verificação mais complexa
                    },
                    include: {
                        manager: {
                            select: {
                                name: true,
                            },
                        },
                    },
                });
                message = `Carro ${result.brand} ${result.model} (${result.plate}) foi restaurado com sucesso e agora aparecerá nas listagens normais.`;
                break;

            case "driver":
                result = await prisma.driver.update({
                    where: { id: itemId },
                    data: {
                        deletedAt: null,
                        deletedById: null,
                        isAvailable: true,
                    },
                });
                message = `Motorista ${result.name} foi restaurado com sucesso e agora aparecerá nas listagens normais.`;
                break;

            case "event":
                result = await prisma.event.update({
                    where: { id: itemId },
                    data: {
                        deletedAt: null,
                        deletedById: null,
                        // Não alteramos isActive ou status, pois pode precisar de uma verificação mais complexa
                    },
                    include: {
                        driver: true,
                        car: true,
                    },
                });
                message = `Evento foi restaurado com sucesso e agora aparecerá nas listagens normais.`;
                break;

            case "manager":
                // Verificar se quem está restaurando é um admin
                const admin = await prisma.manager.findUnique({
                    where: { id: managerId },
                });

                if (!admin || !admin.isAdmin) {
                    return res.status(403).json({
                        error: "Apenas administradores podem restaurar gestores",
                    });
                }

                result = await prisma.manager.update({
                    where: { id: itemId },
                    data: {
                        deletedAt: null,
                        deletedById: null,
                    },
                });
                message = `Gestor ${result.name} foi restaurado com sucesso e agora aparecerá nas listagens normais.`;
                break;

            default:
                return res.status(400).json({
                    error: "Tipo de item inválido. Deve ser 'car', 'driver', 'event' ou 'manager'",
                });
        }

        console.log(
            `Item restaurado: Tipo=${itemType}, ID=${itemId}, managerId=${managerId}`
        );

        return res.status(200).json({
            message,
            success: true,
            itemType,
            itemId,
            restoredById: managerId,
            restoredAt: new Date(),
        });
    } catch (error) {
        console.error("Erro ao restaurar item:", error);
        return res.status(500).json({ error: "Erro ao restaurar item" });
    }
};
