const crypto = require("crypto");
const { getLogins } = require("./filemanagement");

const availableLogins = getLogins();

module.exports.auth = (fetchedLogin, fetchedPassword) => {
    var hashedPassword = crypto.createHash("sha256").update(fetchedPassword).digest("hex");
    var user = availableLogins.find(({ login }) => login === fetchedLogin);
    return user.hashedPassword === hashedPassword ? { id: user.id, userName: user.userName } : -1;
}

module.exports.verifyLogin = (fetchedLogin) => {
    return (availableLogins.findIndex(({ login }) => login === fetchedLogin) !== -1) ? true : false;
}
