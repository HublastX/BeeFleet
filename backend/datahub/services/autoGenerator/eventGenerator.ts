import { prisma } from "../../config/prisma";
import {
    EventType,
    EventStatus,
    CarStatus,
} from "../../schemas/eventInterface";

const generateCheckoutEvent = async (managerId: string) => {
    try {
        const availableCars = await prisma.car.findMany({
            where: {
                managerId,
                isAvailable: true,
                status: "AVAILABLE",
            },
            take: 10,
        });

        if (availableCars.length === 0) {
            console.log("No available cars found for checkout events");
            return null;
        }

        const availableDrivers = await prisma.driver.findMany({
            where: {
                managerId,
                isAvailable: true,
            },
            take: 10,
        });

        if (availableDrivers.length === 0) {
            console.log("No available drivers found for checkout events");
            return null;
        }

        const car =
            availableCars[Math.floor(Math.random() * availableCars.length)];
        const driver =
            availableDrivers[
                Math.floor(Math.random() * availableDrivers.length)
            ];

        const event = await prisma.event.create({
            data: {
                eventType: "CHECKOUT" as EventType,
                odometer: car.odometer,
                createdAt: new Date(),
                managerId,
                driverId: driver.id,
                carId: car.id,
                status: "ACTIVE" as EventStatus,
            },
        });

        await prisma.car.update({
            where: { id: car.id },
            data: {
                status: "IN_USE" as CarStatus,
                isAvailable: false,
            },
        });

        await prisma.driver.update({
            where: { id: driver.id },
            data: {
                isAvailable: false,
            },
        });

        console.log(
            `Created checkout event for car ${car.plate} with driver ${driver.name}`
        );
        return event;
    } catch (error) {
        console.error("Error creating checkout event:", error);
        return null;
    }
};

const generateReturnEvent = async (managerId: string) => {
    try {
        const activeCheckouts = await prisma.event.findMany({
            where: {
                managerId,
                eventType: "CHECKOUT",
                status: "ACTIVE",
            },
            include: {
                car: true,
            },
            take: 10,
        });

        if (activeCheckouts.length === 0) {
            console.log("No active checkout events found");
            return null;
        }

        const checkout =
            activeCheckouts[Math.floor(Math.random() * activeCheckouts.length)];

        const additionalKm = Math.floor(Math.random() * 490) + 10;
        const newOdometer = checkout.car.odometer + additionalKm;

        const returnEvent = await prisma.event.create({
            data: {
                eventType: "RETURN" as EventType,
                odometer: newOdometer,
                createdAt: new Date(),
                managerId,
                driverId: checkout.driverId,
                carId: checkout.carId,
                checkoutEventId: checkout.id,
                status: "COMPLETED" as EventStatus,
                endedAt: new Date(),
            },
        });

        await prisma.event.update({
            where: { id: checkout.id },
            data: {
                status: "COMPLETED" as EventStatus,
                endedAt: new Date(),
            },
        });

        await prisma.report.create({
            data: {
                managerId,
                driverId: checkout.driverId,
                carId: checkout.carId,
                eventType: "RETURN",
                startDate: checkout.createdAt,
                endDate: new Date(),
            },
        });

        await prisma.car.update({
            where: { id: checkout.carId },
            data: {
                odometer: newOdometer,
                status: "AVAILABLE" as CarStatus,
                isAvailable: true,
            },
        });

        await prisma.driver.update({
            where: { id: checkout.driverId },
            data: {
                isAvailable: true,
            },
        });

        console.log(`Created return event for checkout ${checkout.id}`);
        return returnEvent;
    } catch (error) {
        console.error("Error creating return event:", error);
        return null;
    }
};

export const generateEvents = async (managerId: string, count = 5) => {
    const results = {
        checkouts: [] as any[],
        returns: [] as any[],
    };

    for (let i = 0; i < count; i++) {
        try {
            const checkoutEvent = await generateCheckoutEvent(managerId);
            if (checkoutEvent) {
                results.checkouts.push(checkoutEvent);
            }
        } catch (error) {
            console.error("Error in event generation:", error);
        }
    }

    const returnCount = Math.max(1, Math.floor(count / 2));
    for (let i = 0; i < returnCount; i++) {
        try {
            const returnEvent = await generateReturnEvent(managerId);
            if (returnEvent) {
                results.returns.push(returnEvent);
            }
        } catch (error) {
            console.error("Error in return event generation:", error);
        }
    }

    return results;
};
