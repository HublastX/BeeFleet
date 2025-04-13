import { z } from "zod";

export const driverSchema = z.object({
    name: z
        .string()
        .min(1, "Nome é obrigatório")
        .refine((name) => name.trim().split(" ").length >= 2, {
            message: "Nome deve conter pelo menos nome e sobrenome",
        }),
    phone: z
        .string()
        .min(10, "Telefone é obrigatório")
        .regex(/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/, "Telefone inválido"),
    license: z
        .string()
        .min(1, "Número da CNH é obrigatório")
        .regex(/^\d{11}$/, "CNH deve conter 11 números"),
    managerId: z.string().uuid("ID do gerente deve ser um UUID válido"),
    image: z.string().optional(),
});

export const updateDriverSchema = z.object({
    params: z.object({
        id: z.string().uuid("ID do motorista inválido"),
    }),
    body: driverSchema.partial(), // todos os campos opcionais no update
});

export type UpdateDriverRequestParams = z.infer<
    typeof updateDriverSchema
>["params"];
export type UpdateDriverRequestBody = z.infer<
    typeof updateDriverSchema
>["body"];
