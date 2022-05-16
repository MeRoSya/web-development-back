const MongoClient = require("mongodb").MongoClient;

let messages;

module.exports.dbClientInit = (app, port, mongoUrl) => {

    const mongoClient = new MongoClient(mongoUrl);

    mongoClient.connect((err, client) => {
        if (err) return console.log(err);

        messages = client.db("messagesdb").collection("messages");

        app.listen(port, () => {
            console.log("Messaging service started...");
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
