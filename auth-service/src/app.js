const express = require("express");
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');
const { verifyLogin, auth } = require("./login");
const { canCreateUser, register } = require("./registration");
const { dbClientInit } = require("./dbAPI");

require('dotenv').config();

const app = express();

const token = process.env.BOT_API_KEY;

const bot = new TelegramBot(token);

app.use(cors());
app.use(express.json());

//#region Login handle

app.use("/api/v1/auth/login", (request, response, next) => {
    verifyLogin(request.body.login).then(
        (result) => {
            if (!result) {
                response.sendStatus(404);
            } else {
                console.log("Login is verified");
                next();
            }
        });
});

app.post("/api/v1/auth/login", (request, response) => {
    auth(request.body.login, request.body.password).then(
        (userInfo) => {
            if (userInfo === -1) {
                response.sendStatus(401);
            } else {
                console.log("User " + userInfo.userName + " successfully authenticated");

                bot.sendMessage(process.env.LOGIN_CHAT_ID, "User " + userInfo.userName + " logged in at " + new Date(Date.now()).toUTCString());

                response.send(JSON.stringify(userInfo));
            }
        });
});

//#endregion Login handle

//#region Registration handle

app.use("/api/v1/auth/registration", (request, response, next) => {
    canCreateUser(request.body.login).then(
        (result) => {
            if (!result) {
                response.sendStatus(403);
            } else {
                console.log("Login is available for registration");
                next();
            }
        }
    );
});

app.post("/api/v1/auth/registration", (request, response) => {
    const userInfo = request.body

    register(userInfo.login, userInfo.password, userInfo.userName).then((userResponse) => {

        if (userResponse === -1) {
            response.sendStatus(401);
        } else {
            console.log("User " + userResponse.userName + " successfully registered");

            bot.sendMessage(process.env.LOGIN_CHAT_ID, "User " + userResponse.userName + " logged in at " + new Date(Date.now()).toUTCString());

            response.send(JSON.stringify(userResponse));
        }

    });
});

//#endregion Registration handle

dbClientInit(app, 3001, process.env.MONGO_URL);
