#!/bin/sh

echo "Fazendo as Migrations"
npx prisma migrate dev
node server.js
echo "Finalizando as Migrations"
