const { addMessage, getMessages } = require("./dbAPI");
require("dotenv").config();

module.exports.getChatMessages = async () => {
  return await getMessages();
};

module.exports.sendChatMessage = async (userName, messageBody, bot) => {
  newMessage = {
    userName: userName,
    text: messageBody,
  };

  addMessage(newMessage).then(
    () => {   
      bot
      .sendMessage(
        process.env.MEROSYA_CHAT_ID,
        "*" + userName + "*" + "\n" + messageBody,
        { parse_mode: "Markdown" }
      )
      .catch((error) => {
        console.log(error.response.body);
      });
    }
  );
};
