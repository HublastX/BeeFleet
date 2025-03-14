
FROM node:22


WORKDIR /app


COPY package.json package-lock.json ./


RUN npm install --omit=dev


COPY . .


EXPOSE 3000


CMD ["node", "server.js"]
