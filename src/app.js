const express = require("express");
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const app = express();

const token = process.env.BOT_API_KEY;

const bot = new TelegramBot(token);

app.use(cors());

app.listen(3001);