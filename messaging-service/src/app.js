const express = require("express");
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');
const { sendChatMessage, getChatMessages } = require("./messaging");
const { dbClientInit } = require("./dbAPI");

require('dotenv').config();

const app = express();

const token = process.env.BOT_API_KEY;

const bot = new TelegramBot(token);

app.use(cors());
app.use(express.json());

//#region Messages
app.post("/api/v1/messaging/sendMessage", (request, response) => {
    sendChatMessage(request.body.userName, request.body.messageBody, bot).then(
        () => response.sendStatus(200)
    );
})

app.get("/api/v1/messaging/getMessages", (request, response) => {
    getChatMessages().then(
        (messages) => response.send(messages)
    );
})
//#endregion

dbClientInit(app, 3001, process.env.MONGO_URL);
