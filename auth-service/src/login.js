const crypto = require("crypto");
const { findByEmail, findByUserName } = require("./dbAPI");

module.exports.auth = async (fetchedLoginData, fetchedPassword, authMethod) => {
    var hashedPassword = crypto.createHash("sha256").update(fetchedPassword).digest("hex");
    var user = authMethod === "byEmail" ? await findByEmail(fetchedLoginData) : await findByUserName(fetchedLoginData);
    return user.hashedPassword === hashedPassword ? { id: user._id, userName: user.userName } : null;
}

module.exports.verifyLogin = async (fetchedLoginData) => {
    const foundByEmail = await findByEmail(fetchedLoginData);
    
    if (foundByEmail === null) {
        const foundByUserName = await findByUserName(fetchedLoginData);

        return foundByUserName !== null ? "byUserName" : false;
    }

    return "byEmail";
}
