const express = require("express");
const cors = require("cors");
const TelegramBot = require("node-telegram-bot-api");
const mongoose = require("mongoose");
const { verifyLogin, auth } = require("./login");
const { canCreateUser, signUp } = require("./registration");

require("dotenv").config();

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
                console.error("User " + request.body.login + " not found");
                response.status(404).json({
                    login: request.body.login,
                    reason: "User not found"
                });
            } else {
                console.log("Login is verified");
                request.body.authMethod = result;
                next();
            }
        });
});

app.post("/api/v1/auth/login", (request, response) => {
    auth(request.body.login, request.body.password, request.body.authMethod).then(
        (userInfo) => {
            if (userInfo === null) {
                response.status(401).json({
                    login: userInfo.login,
                    reason: "Could not verify password"
                });
            } else {
                console.log("User " + userInfo.userName + " successfully authenticated");

                bot.sendMessage(process.env.LOGIN_CHAT_ID, "User " + userInfo.userName + " logged in at " + new Date(Date.now()).toUTCString());

                response.json(userInfo);
            }
        });
});

//#endregion Login handle

//#region Registration handle

app.use("/api/v1/auth/registration", (request, response, next) => {
    canCreateUser(request.body.login).then(
        (result) => {
            if (!result) {
                console.error("Login is not available for registration");
                response.status(403).json({ reason: "Login is not available for registration" });
            } else {
                console.log("Login is available for registration");
                next();
            }
        }
    ).catch((error) => {
        console.error(error);
    });
});

app.post("/api/v1/auth/registration", (request, response) => {
    const userInfo = request.body

    signUp(userInfo.login, userInfo.password, userInfo.userName).then((userResponse) => {

        console.log("User " + userResponse.userName + " successfully registered");

        bot.sendMessage(process.env.LOGIN_CHAT_ID, "User " + userResponse.userName + " logged in at " + new Date(Date.now()).toUTCString());

        response.json(userResponse);
    }).catch((error) => {
        console.error("Unable to sign user up");
        response.status(500).json({
            message: "Unable to sign user up",
            error: error
        });
    });
});

//#endregion Registration handle

app.listen(3001, async () => {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Auth service started...");
});
