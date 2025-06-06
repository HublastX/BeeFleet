import { faker } from "@faker-js/faker/locale/pt_BR";

export const generateValidPlate = (): string => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";

    let plate = "";

    for (let i = 0; i < 3; i++) {
        plate += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    plate += numbers.charAt(Math.floor(Math.random() * numbers.length));

    if (Math.random() > 0.5) {
        plate += letters.charAt(Math.floor(Math.random() * letters.length));
    } else {
        plate += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    for (let i = 0; i < 2; i++) {
        plate += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    return plate;
};

export const generateValidRenavam = (): string => {
    let renavam = "";
    for (let i = 0; i < 11; i++) {
        renavam += Math.floor(Math.random() * 10).toString();
    }
    return renavam;
};

export const generateValidChassis = (): string => {
    const validChars = "ABCDEFGHJKLMNPRSTUVWXYZ0123456789";
    let chassis = "";
    for (let i = 0; i < 17; i++) {
        chassis += validChars.charAt(
            Math.floor(Math.random() * validChars.length)
        );
    }
    return chassis;
};

export const generateValidLicense = (): string => {
    let license = "";
    for (let i = 0; i < 11; i++) {
        license += Math.floor(Math.random() * 10).toString();
    }
    return license;
};
