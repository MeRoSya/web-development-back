const crypto = require("crypto");
const { createUser, findByEmail, findByUserName } = require("./dbAPI");

module.exports.signUp = async (fetchedEmail, fetchedPassword, fetchedUserName) => {
    var hashedPassword = crypto.createHash("sha256").update(fetchedPassword).digest("hex");
    
    user = {
        email: fetchedEmail,
        userName: fetchedUserName,
        hashedPassword: hashedPassword
    };

    const added_id = (await createUser(user))._id;

    return {
        id: added_id,
        userName: user.userName
    }
}

module.exports.canCreateUser = async (fetchedLoginData) => {

    const email = await findByEmail(fetchedLoginData);
    
    if (email === null) {
        const userName = await findByUserName(fetchedLoginData);

        return userName === null;
    }

    return false;
}
