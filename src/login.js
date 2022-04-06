const crypto = require("crypto");

//TODO: Вынести в json файл (а лучше в бд), который будет дополняться (для регистрации)
const availableLogins = [
    {
        id: 1,
        login: "root@root.com",
        userName: "root",
        hashedPassword: crypto.createHash("sha256").update("123456aA").digest("hex")
    }
];

module.exports.auth = (fetchedLogin, fetchedPassword) => {
    var hashedPassword = crypto.createHash("sha256").update(fetchedPassword).digest("hex");
    var user = availableLogins.find(({ login }) => login === fetchedLogin);
    return user.hashedPassword === hashedPassword ? { id: user.id, userName: user.userName } : -1;
}

module.exports.verifyLogin = (fetchedLogin) => {
    return (availableLogins.findIndex(({ login }) => login === fetchedLogin) !== -1) ? true : false;
}