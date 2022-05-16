const MongoClient = require("mongodb").MongoClient;

let users;
let messages;

module.exports.dbClientInit = (app, port, mongoUrl) => {

    const mongoClient = new MongoClient(mongoUrl);

    mongoClient.connect((err, client) => {
        if (err) return console.log(err);

        users = client.db("usersdb").collection("users");
        messages = client.db("messagesdb").collection("messages");

        app.listen(port, () => {
            console.log("Server started...");
        });
    });
}

module.exports.getMessages = async () => {
    const messagesList = await messages.find({}).toArray();

    return messagesList;
}

module.exports.addMessage = async (message) => {
    const addedMessage = await messages.insertOne(message);

    return addedMessage;
}

module.exports.getLogins = async () => {
    const loginList = await users.find({}).toArray();

    return loginList;
}

module.exports.addLogin = async (user) => {
    const addedUser = await users.insertOne(user);

    return addedUser;
}
