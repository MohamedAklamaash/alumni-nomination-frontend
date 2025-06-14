FROM node:lts-alpine

WORKDIR /app

COPY package.json .

RUN npm install --legacy-peer-deps

COPY .env .
COPY . .

RUN npm run build --production

RUN npm install -g serve

CMD ["serve", "-s", "dist"]