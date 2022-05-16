const MongoClient = require("mongodb").MongoClient;

let users;

module.exports.dbClientInit = (app, port, mongoUrl) => {

    const mongoClient = new MongoClient(mongoUrl);

    mongoClient.connect((err, client) => {
        if (err) return console.log(err);

        users = client.db("usersdb").collection("users");

        app.listen(port, () => {
            console.log("Auth service started...");
        });
    });
}

module.exports.getLogins = async () => {
    const loginList = await users.find({}).toArray();

    return loginList;
}

module.exports.addLogin = async (user) => {
    const addedUser = await users.insertOne(user);

    return addedUser;
}
