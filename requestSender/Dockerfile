FROM node:lts-alpine

WORKDIR requestSender

COPY package*.json ./
RUN npm ci
COPY . .

RUN npm run build

EXPOSE 8000

CMD ["node", "dist/server.js"]
