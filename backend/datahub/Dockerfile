
FROM node:22


WORKDIR /app


COPY package.json package-lock.json ./


RUN npm install --omit=dev


COPY . .

RUN chmod +x entrypoint.sh

EXPOSE 3001


CMD ["node", "server.js"]
