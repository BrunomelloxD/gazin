FROM node:lts-alpine3.19 as builder

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm install
COPY . .

EXPOSE 5173
CMD [ "npm", "run", "dev" ]
