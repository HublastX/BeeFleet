import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, ".env");

if (fs.existsSync(envPath)) {
    console.log(`✅ Arquivo .env encontrado em: ${envPath}`);

    const envContent = fs.readFileSync(envPath, "utf8");
    if (!envContent.includes("DATABASE_URL=")) {
        console.error(
            "❌ A variável DATABASE_URL não está definida no arquivo .env"
        );
        process.exit(1);
    }

    try {
        process.env.DATABASE_URL =
            envContent
                .split("\n")
                .find((line) => line.startsWith("DATABASE_URL="))
                ?.replace("DATABASE_URL=", "")
                ?.replace(/^["'](.*)["']$/, "$1") || "";

        if (!process.env.DATABASE_URL) {
            console.error(
                "❌ Não foi possível extrair DATABASE_URL do arquivo .env"
            );
            process.exit(1);
        }

        console.log("🔄 Executando prisma migrate...");

        execSync(
            `npx prisma migrate dev --schema=${path.resolve(
                __dirname,
                "../backend/datahub/prisma/schema.prisma"
            )}`,
            { stdio: "inherit", env: process.env }
        );
        console.log("✅ Migração concluída com sucesso!");
    } catch (error) {
        console.error("❌ Erro ao executar a migração:", error.message);
        process.exit(1);
    }
} else {
    console.error(`❌ Arquivo .env não encontrado em: ${envPath}`);
    console.log(
        "📝 Verifique o caminho correto para o arquivo .env no script prisma-migrate.js"
    );
    process.exit(1);
}
