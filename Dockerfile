FROM node

WORKDIR /chat-server

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]
