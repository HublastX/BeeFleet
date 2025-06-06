import { prisma } from "../../config/prisma";
import {
    generateValidPlate,
    generateValidRenavam,
    generateValidChassis,
} from "./utils";
import { GenerateOptions } from "../../schemas/generateInterface";

const generateCar = async (managerId: string) => {
    const brands = [
        "Toyota",
        "Honda",
        "Volkswagen",
        "Fiat",
        "Chevrolet",
        "Ford",
        "Hyundai",
        "Renault",
        "Nissan",
    ];
    const models = {
        Toyota: ["Corolla", "Etios", "Hilux", "Yaris"],
        Honda: ["Civic", "Fit", "HR-V", "City"],
        Volkswagen: ["Gol", "Fox", "Polo", "T-Cross"],
        Fiat: ["Uno", "Argo", "Toro", "Mobi"],
        Chevrolet: ["Onix", "Cruze", "S10", "Tracker"],
        Ford: ["Ka", "Ranger", "EcoSport", "Fiesta"],
        Hyundai: ["HB20", "Creta", "Tucson", "i30"],
        Renault: ["Kwid", "Sandero", "Duster", "Logan"],
        Nissan: ["Kicks", "Versa", "March", "Frontier"],
    };
    const colors = ["Preto", "Branco", "Prata", "Cinza", "Vermelho", "Azul"];

    let plate, renavam, chassis;
    let isUnique = false;

    while (!isUnique) {
        plate = generateValidPlate();
        renavam = generateValidRenavam();
        chassis = generateValidChassis();

        const existingCar = await prisma.car.findFirst({
            where: {
                OR: [{ plate }, { renavam }, { chassis }],
            },
        });

        if (!existingCar) {
            isUnique = true;
        }
    }

    const brand = brands[Math.floor(Math.random() * brands.length)];
    const brandModels = models[brand as keyof typeof models];
    const model = brandModels[Math.floor(Math.random() * brandModels.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const year = Math.floor(Math.random() * 10) + 2014;
    const odometer = Math.floor(Math.random() * 100000);

    return {
        plate,
        renavam,
        chassis,
        brand,
        model,
        year,
        color,
        odometer,
        managerId,
    };
};

export const generateCars = async ({ managerId, count }: GenerateOptions) => {
    const results: any[] = [];

    for (let i = 0; i < count; i++) {
        try {
            const carData = await generateCar(managerId);
            const car = await prisma.car.create({
                data: carData,
            });
            results.push(car);
        } catch (error) {
            console.error("Error creating car:", error);
        }
    }

    return results;
};
