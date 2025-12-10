FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY src ./src

RUN npm install

CMD ["node", "src/server.js"]