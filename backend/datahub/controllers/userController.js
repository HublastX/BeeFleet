import { prisma } from "../config/prisma.js";

// Criar um gestor
export const createManager = async (req, res) => {
    const { name, email, password, phone } = req.body;
    try {
        const manager = await prisma.manager.create({
            data: { name, email, password, phone },
        });
        res.json(manager);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Criar um motorista
export const createDriver = async (req, res) => {
    const { name, cpf, driverLicense, phone } = req.body;
    try {
        const driver = await prisma.driver.create({
            data: { name, cpf, driverLicense, phone },
        });
        res.json(driver);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Criar um carro
export const createCar = async (req, res) => {
    const { plate, model, year, managerId } = req.body;
    try {
        const car = await prisma.car.create({
            data: { plate, model, year, managerId },
        });
        res.json(car);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const solicitaCar = async (req, res) => {
    const {
        carId,
        managerId,
        driverName,
        driverCpf,
        driverLicense,
        driverPhone,
    } = req.body;
    try {
        const request = await prisma.carRequest.create({
            data: {
                carId,
                managerId,
                driverName,
                driverCpf,
                driverLicense,
                driverPhone,
            },
        });
        res.json(request);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Aprovar ou rejeitar a solicitação
export const aprovarSolicitacao = async (req, res) => {
    const { id } = req.params;
    try {
        // Busca a solicitação
        const request = await prisma.carRequest.findUnique({
            where: { id },
            include: { car: true, manager: true },
        });

        if (!request) {
            return res
                .status(404)
                .json({ error: "Solicitação não encontrada" });
        }

        // Criar motorista se não existir
        let driver = await prisma.driver.findUnique({
            where: { cpf: request.driverCpf },
        });

        if (!driver) {
            driver = await prisma.driver.create({
                data: {
                    name: request.driverName,
                    cpf: request.driverCpf,
                    driverLicense: request.driverLicense,
                    phone: request.driverPhone,
                },
            });
        }

        // Atualizar status da solicitação
        await prisma.carRequest.update({
            where: { id },
            data: { status: "APPROVED" },
        });

        // Criar evento de saída (removendo driverPhone)
        const event = await prisma.event.create({
            data: {
                managerId: request.managerId,
                carId: request.carId,
                driverId: driver.id,
                odometer: req.body.odometer || 0,
                type: "CHECKOUT",
            },
        });

        // Tornar carro indisponível
        await prisma.car.update({
            where: { id: request.carId },
            data: { available: false },
        });

        res.json({ message: "Solicitação aprovada", driver, event });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Criar evento de devolução do carro
export const devolverCarro = async (req, res) => {
    const { carId, driverId, odometer } = req.body;
    try {
        // Criar evento de devolução
        const event = await prisma.event.create({
            data: {
                managerId: req.body.managerId,
                carId,
                driverId,
                odometer,
                type: "RETURN",
            },
        });

        // Tornar carro disponível novamente
        await prisma.car.update({
            where: { id: carId },
            data: { available: true },
        });

        res.json({ message: "Carro devolvido com sucesso", event });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
