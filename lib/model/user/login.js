const axios = require('axios');
const keys = require('../../config/keys');
const { facebook } = require('../../config/config');
const db = require('../../../database/dbController');

const { TokenExpiredError, InvalidTokenError } = require('../../error/token');


const login = async (accessToken) => {

    console.log(accessToken);
    const userData = await axios.get(facebook.graphApiURL,
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

    //prepare data for db actions
    const facebookID = { 'facebookID': userData.data.id };
    const tizerToken = { tizerToken: token };

    const user = await db.findUser(facebookID, tizerToken);

    user != null ? await db.updateUser(facebookID, tizerToken) :
        await db.saveUserToDB(userData.data, token);

    return token;
}

const checkToken = async (token) => {
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
    login,
    checkToken
}
