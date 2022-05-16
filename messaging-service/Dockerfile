FROM node:alpine

WORKDIR /messaging-service

COPY package*.json ./

RUN npm install --production

COPY . .

CMD [ "npm", "start" ]
