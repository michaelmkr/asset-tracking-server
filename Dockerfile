FROM node:10.15-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY src ./src

EXPOSE 8080 9000

CMD [ "npm", "start" ]
