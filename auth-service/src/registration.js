const crypto = require("crypto");
const { addLogin, getLogins } = require("./dbAPI");

module.exports.register = async (fetchedLogin, fetchedPassword, fetchedUserName) => {
    var hashedPassword = crypto.createHash("sha256").update(fetchedPassword).digest("hex");
    
    user = {
        login: fetchedLogin,
        userName: fetchedUserName,
        hashedPassword: hashedPassword
    };

    const added_id = (await addLogin(user)).insertedId;

    return {
        id: added_id,
        userName: user.userName
    }
}

module.exports.canCreateUser = async (fetchedLogin) => {
    return ((await getLogins()).findIndex(({ login }) => login === fetchedLogin) !== -1) ? false : true;
}
