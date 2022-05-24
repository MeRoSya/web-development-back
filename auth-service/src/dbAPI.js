const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = mongoose.model("user", new Schema({
    email: String,
    userName: String,
    hashedPassword: String
}));

module.exports.findByEmail = async email => await user.findOne({email: email});

module.exports.findByUserName = async userName => await user.findOne({userName: userName});


module.exports.createUser = async newUser => await user.create(newUser);
