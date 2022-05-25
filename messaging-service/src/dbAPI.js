const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const message = mongoose.model("user", new Schema({
    userName: String,
    text: String
}));

module.exports.getMessages = async () => await message.find({});

module.exports.addMessage = async (newMessage) => await message.create(newMessage);
