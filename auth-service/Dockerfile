FROM node:alpine

WORKDIR /auth-service

COPY package*.json ./

RUN npm install --production

COPY . .

CMD [ "npm", "start" ]
