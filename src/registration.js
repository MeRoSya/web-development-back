const crypto = require("crypto");
const { v4 } = require("uuid");
const { addLogin, getLogins } = require("./filemanagement");

const availableLogins = getLogins();

module.exports.register = (fetchedLogin, fetchedPassword, fetchedUserName) => {
    var hashedPassword = crypto.createHash("sha256").update(fetchedPassword).digest("hex");
    
    user = {
        id: v4(),
        login: fetchedLogin,
        userName: fetchedUserName,
        hashedPassword: hashedPassword
    };

    addLogin(user);

    return {
        id: user.id,
        userName: user.userName
    }
}

module.exports.canCreateUser = (fetchedLogin) => {
    return (availableLogins.findIndex(({ login }) => login === fetchedLogin) !== -1) ? false : true;
}
