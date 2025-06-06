import { prisma } from "../../config/prisma";
import { faker } from "@faker-js/faker/locale/pt_BR";
import { generateValidLicense } from "./utils";
import { GenerateOptions } from "../../schemas/generateInterface";

const generateDriver = async (managerId: string) => {
    let license;
    let isUnique = false;

    while (!isUnique) {
        license = generateValidLicense();

        const existingDriver = await prisma.driver.findFirst({
            where: { license },
        });

        if (!existingDriver) {
            isUnique = true;
        }
    }

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const name = `${firstName} ${lastName}`;

    const ddd = Math.floor(Math.random() * 89) + 11;
    const phone = `(${ddd}) 9${Math.floor(Math.random() * 9000) + 1000}-${
        Math.floor(Math.random() * 9000) + 1000
    }`;

    return {
        name,
        phone,
        license,
        managerId,
    };
};

export const generateDrivers = async ({
    managerId,
    count,
}: GenerateOptions) => {
    const results: any[] = [];

    for (let i = 0; i < count; i++) {
        try {
            const driverData = await generateDriver(managerId);
            const driver = await prisma.driver.create({
                data: driverData,
            });
            results.push(driver);
        } catch (error) {
            console.error("Error creating driver:", error);
        }
    }

    return results;
};
