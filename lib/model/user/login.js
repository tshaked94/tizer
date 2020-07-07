const axios = require('axios');
const keys = require('../../config/keys');
const facebook = require('../../config/config').facebook;
const db = require('../../../database/dbController');

const TokenExpiredError = require('../../error/token').TokenExpiredError;
const InvalidTokenError = require('../../error/token').InvalidTokenError;


async function login(accessToken) {

    console.log(accessToken);
    var userData = await axios.get(facebook.graphApiURL,
        {
            params: {
                access_token: accessToken,
                fields: facebook.fields
            }
        })
        .catch((err) => {
            throw new Error('Invalid Access Token');
        });

    console.log(userData);

    const token = await keys.createToken(userData.data.id + accessToken);
    console.log(userData.data);

    const facebookID = { 'facebookID': userData.data.id };
    const tizerToken = { tizerToken: token };

    const user = await db.findUser(facebookID, tizerToken);

    if (user) {
        await db.updateUser(facebookID, tizerToken).then(() => {
            console.log('user tizer token updated in database');
        });
    } else {
        await db.saveUserToDB(userData.data, token)
            .catch((error) => {
                throw new Error("There was error saving user in DB");
            });
    }

    return token;
}

async function checkToken(token) {
    const user = await db.findUser({ tizerToken: token });

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
