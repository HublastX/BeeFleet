import cron from "node-cron";
import { generateCars } from "./carGenerator";
import { generateDrivers } from "./driverGenerator";
import { generateEvents } from "./eventGenerator";

export const scheduleAutoGeneration = (
    managerId: string,
    carCount = 5,
    driverCount = 3,
    eventCount = 4
) => {
    cron.schedule("25 22 * * *", async () => {
        console.log(
            `[${new Date().toISOString()}] Starting scheduled auto-generation...`
        );

        try {
            const cars = await generateCars({ managerId, count: carCount });
            console.log(`Created ${cars.length} cars successfully`);

            const drivers = await generateDrivers({
                managerId,
                count: driverCount,
            });
            console.log(`Created ${drivers.length} drivers successfully`);

            const events = await generateEvents(managerId, eventCount);
            console.log(
                `Created ${events.checkouts.length} checkout events and ${events.returns.length} return events successfully`
            );

            console.log(`Auto-generation completed successfully`);
        } catch (error) {
            console.error(`Error in auto-generation:`, error);
        }
    });

    console.log(`Auto-generation scheduled for daily at 21:30`);
};

export const runImmediateGeneration = async (
    managerId: string,
    carCount = 5,
    driverCount = 3,
    eventCount = 4
) => {
    console.log(
        `[${new Date().toISOString()}] Starting immediate auto-generation...`
    );

    try {
        const cars = await generateCars({ managerId, count: carCount });
        console.log(`Created ${cars.length} cars successfully`);

        const drivers = await generateDrivers({
            managerId,
            count: driverCount,
        });
        console.log(`Created ${drivers.length} drivers successfully`);

        const events = await generateEvents(managerId, eventCount);
        console.log(
            `Created ${events.checkouts.length} checkout events and ${events.returns.length} return events successfully`
        );

        console.log(`Immediate generation completed successfully`);
        return { cars, drivers, events };
    } catch (error) {
        console.error(`Error in immediate generation:`, error);
        throw error;
    }
};

export { generateCars } from "./carGenerator";
export { generateDrivers } from "./driverGenerator";
export { generateEvents } from "./eventGenerator";
