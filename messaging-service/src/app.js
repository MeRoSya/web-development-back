const express = require("express");
const cors = require("cors");
const TelegramBot = require("node-telegram-bot-api");
const mongoose = require("mongoose");
const { sendChatMessage, getChatMessages } = require("./messaging");

require("dotenv").config();

const app = express();

const token = process.env.BOT_API_KEY;

const bot = new TelegramBot(token);

app.use(cors());
app.use(express.json());

//#region Messages
app.post("/api/v1/messaging/sendMessage", (request, response) => {
    sendChatMessage(request.body.userName, request.body.messageBody, bot).then(
        () => response.sendStatus(200)
    ).catch(
        error => response.status(500).json({ code: error })
    );
})

app.get("/api/v1/messaging/getMessages", (request, response) => {
    getChatMessages().then(
        messages => response.json(messages)
    ).catch(
        error => response.status(500).json({ code: error })
    );
})
//#endregion

app.listen(3001, async () => {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Messaging service started...");
});
