const TelegramBot = require("node-telegram-bot-api");
const { addMessage, getMessages } = require("./filemanagement");
require("dotenv").config();

module.exports.getChatMessages = () => {
  return getMessages();
};

module.exports.sendChatMessage = (userName, messageBody, bot) => {
  newMessage = {
    userName: userName,
    text: messageBody,
  };

  addMessage(newMessage);

  bot
    .sendMessage(
      process.env.SAIBAKEN_CHAT_ID,
      "*" + userName + "*" + "\n" + messageBody,
      { parse_mode: "Markdown" }
    )
    .catch((error) => {
      console.log(error.response.body);
    });
};
