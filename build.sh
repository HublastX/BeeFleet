#!/bin/bash

# Copia o arquivo .env
cp .env backend/datahub/.env
echo "Arquivo .env copiado."

# Tenta rodar docker compose up --build
if ! docker compose up --build; then
    echo "Erro ao executar 'docker compose up --build'. Tentando com 'docker-compose up --build'..."
    docker-compose up --build
fi
