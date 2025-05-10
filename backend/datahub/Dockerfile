
FROM node:22


WORKDIR /app


COPY package.json package-lock.json ./



RUN npm install --omit=dev

COPY . .



EXPOSE 5004


CMD ["npm", "run", 'dev']

