const crypto = require("crypto");
const fs = require("fs");
const { v4 } = require("uuid");

const availableLogins = JSON.parse(fs.readFileSync("users.json")) ?? []

module.exports.register = (fetchedLogin, fetchedPassword, fetchedUserName) => {
    var hashedPassword = crypto.createHash("sha256").update(fetchedPassword).digest("hex");
    
    user = {
        id: v4(),
        login: fetchedLogin,
        userName: fetchedUserName,
        hashedPassword: hashedPassword
    };

    availableLogins.push(user);

    fs.writeFileSync("users.json", JSON.stringify(availableLogins));

    return {
        id: user.id,
        userName: user.userName
    }
}

module.exports.canCreateUser = (fetchedLogin) => {
    return (availableLogins.findIndex(({ login }) => login === fetchedLogin) !== -1) ? false : true;
}
