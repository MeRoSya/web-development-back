const express = require("express");
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');
const { verifyLogin, auth } = require("./login");
const { canCreateUser, register } = require("./registration");

require('dotenv').config();

const app = express();

const token = process.env.BOT_API_KEY;

const bot = new TelegramBot(token);

app.use(cors());
app.use(express.json());

//#region Login handle

app.use("/login", (request, response, next) => {
    if (!verifyLogin(request.body.login)) {
        response.sendStatus(404);
    } else {
        console.log("Login is verified");
        next();
    }
});

app.post("/login", (request, response) => {
    const userInfo = auth(request.body.login, request.body.password);

    if (userInfo === -1) {
        response.sendStatus(401);
    } else {
        console.log("User " + userInfo.userName + " successfully authenticated");

        bot.sendMessage(process.env.MEROSYA_CHAT_ID, "User " + userInfo.userName + " logged in at " + new Date(Date.now()).toUTCString());

        response.send(JSON.stringify(userInfo));
    }
});

//#endregion Login handle

//#region Registration handle

app.use("/registration", (request, response, next) => {
    if (!canCreateUser(request.body.login)) {
        response.sendStatus(403);
    } else {
        console.log("Login is not registered");
        next();
    }
});

app.post("/registration", (request, response) => {
    const userInfo = request.body
    
    const userResponse = register(userInfo.login, userInfo.password, userInfo.userName); 

    if (userResponse === -1) {
        response.sendStatus(401);
    } else {
        console.log("User " + userResponse.userName + " successfully registered");

        bot.sendMessage(process.env.MEROSYA_CHAT_ID, "User " + userResponse.userName + " logged in at " + new Date(Date.now()).toUTCString());

        response.send(JSON.stringify(userResponse));
    }
});

//#endregion Registration handle

app.listen(3001);
