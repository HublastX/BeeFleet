import { z } from "zod";

export const carSchema = z.object({
    plate: z
        .string()
        .min(1, "Placa é obrigatória")
        .regex(
            /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/,
            "Placa deve estar no formato Mercosul (ex: ABC1D23 ou ABC1234)"
        )
        .transform((plate) => {
            return `${plate.slice(0, 3)}${plate.slice(3)}`.toUpperCase();
        }),
    renavam: z
        .string()
        .regex(/^\d{11}$/, "Renavam deve conter exatamente 11 dígitos (ex: 12345678901)"),
    chassis: z
        .string()
        .regex(/^[A-HJ-NPR-Z0-9]{17}$/, "Chassi deve conter 17 caracteres alfanuméricos válidos"),
    brand: z.string().min(1, "Marca é obrigatória"),
    model: z.string().min(1, "Modelo é obrigatório"),
    year: z.coerce
        .number()
        .int()
        .positive()
        .min(1900, "Ano deve ser maior que 1900"),
    color: z.string().min(1, "Cor é obrigatória"),
    odometer: z.coerce.number().nonnegative("Hodômetro não pode ser negativo"),
    managerId: z.string().uuid("ID do gerente deve ser um UUID válido"),
    image: z.string().optional(),
});

export const createCarSchema = z.object({
    body: carSchema,
});

export const updateCarSchema = z.object({
    params: z.object({
        id: z.string().uuid("ID deve ser um UUID válido"),
    }),
    body: carSchema.partial().extend({
        odometer: z.coerce
            .number()
            .nonnegative("Hodômetro não pode ser negativo")
            .optional(),
    }),
});

export type CreateCarRequestBody = z.infer<typeof createCarSchema>["body"];
export type UpdateCarRequestBody = z.infer<typeof updateCarSchema>["body"];
export type UpdateCarRequestParams = z.infer<typeof updateCarSchema>["params"];
