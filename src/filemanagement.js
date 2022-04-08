const fs = require("fs");

module.exports.getLogins = () => {
  return JSON.parse(fs.readFileSync("users.json")) ?? [];
};

module.exports.getMessages = () => {
  return JSON.parse(fs.readFileSync("messages.json")) ?? [];
};

module.exports.addLogin = (user) => {
  logins = module.exports.getLogins();
  logins.push(user);
  fs.writeFileSync("users.json", JSON.stringify(logins));
};

module.exports.addMessage = (message) => {
  messages = module.exports.getMessages();
  messages.push(message);
  fs.writeFileSync("messages.json", JSON.stringify(messages));
};
