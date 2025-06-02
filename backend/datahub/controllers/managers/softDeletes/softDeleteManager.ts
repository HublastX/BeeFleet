import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const softDeleteManager = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { adminId, reason } = req.body;

        if (!id || !adminId) {
            return res.status(400).json({
                error: "ID do gestor a ser excluído e ID do administrador são obrigatórios",
            });
        }

        const manager = await prisma.manager.findUnique({
            where: { id },
        });

        if (!manager) {
            return res.status(404).json({ error: "Gestor não encontrado" });
        }

        if (manager.deletedById) {
            return res.status(400).json({
                error: "Este gestor já foi ocultado",
                deletedAt: manager.deletedAt,
            });
        }

        const admin = await prisma.manager.findUnique({
            where: { id: adminId },
        });

        if (!admin || !admin.isAdmin) {
            return res.status(403).json({
                error: "Apenas administradores podem ocultar gestores",
            });
        }

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
