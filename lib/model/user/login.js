const axios = require('axios');
const keys = require('../../config/keys');
const facebook = require('../../config/config').facebook;
const UserSchema = require('../../../lib/database/schemas/user/User');
const User = require('../user');

const TokenExpiredError = require('../../error/token').TokenExpiredError;
const InvalidTokenError = require('../../error/token').InvalidTokenError;


async function login(accessToken) {
    var userData = await axios.get(facebook.graphApiURL + '/me', {
        params: {
            access_token: accessToken,
            fields: facebook.fields,
        }
    });
    const token = await keys.createToken(userData.data.id + accessToken);
    //todo:
    //user that connect already once - need to update its details in db
    await User.saveToDB(userData.data, token)
        .catch((error) => {
            console.log(error)
        });

    return token;
}

async function checkToken(token) {
    const user = await UserSchema.findOne({ tizerToken: token });

    if (!user) {
        throw new InvalidTokenError('Invalid Token');
    }

    if (user.tokenExpiredDate < Date.now()) {
        throw new TokenExpiredError('Token Expired!');
    }

    return user;
}

module.exports = {
    login: login,
    checkToken: checkToken
}
