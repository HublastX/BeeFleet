
FROM node:22


WORKDIR /app


COPY package.json package-lock.json ./

COPY .env ./

RUN npm install --omit=dev
RUN npm rebuild bcrypt --build-from-source
COPY . .



EXPOSE 3001


CMD ["npm", "run", 'dev']

