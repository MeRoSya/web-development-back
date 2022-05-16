const crypto = require("crypto");
const { getLogins } = require("./dbAPI");

module.exports.auth = async (fetchedLogin, fetchedPassword) => {
    var hashedPassword = crypto.createHash("sha256").update(fetchedPassword).digest("hex");
    var user = (await getLogins()).find(({ login }) => login === fetchedLogin);
    return user.hashedPassword === hashedPassword ? { id: user._id, userName: user.userName } : -1;
}

module.exports.verifyLogin = async (fetchedLogin) => {
    return ((await getLogins()).findIndex(({ login }) => login === fetchedLogin) !== -1) ? true : false;
}
