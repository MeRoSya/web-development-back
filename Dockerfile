FROM node:alpine

WORKDIR /chat-server

COPY package*.json ./

RUN npm install --production

COPY . .

CMD [ "npm", "start" ]
