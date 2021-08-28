  FROM node:12.19.0-alpine3.9 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install --only=development
COPY . .

RUN npm run build

FROM node:12.19.0-alpine3.9 as production

ARG NODE_ENV=production
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .
EXPOSE 3000
CMD ["node", "dist/main"]