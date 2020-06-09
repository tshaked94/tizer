const axios = require('axios');
const keys = require('../../config/keys');
const facebook = require('../../config/config').facebook;
const UserSchema = require('../../../lib/database/schemas/user/User');
const User = require('../user');
const date = require('../utils/date');

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
    var expirationDate = date.getDateTime(date.timeUnits.month, 2);
    const user = await UserSchema.findOneAndUpdate({ 'facebookID': userData.data.id }, {
        //TODO update all details that we get from facebook
        tizerToken: token,
        tokenExpiredDate: expirationDate
    }, { new: true });
    console.log(user);
    if (!user) {
        await User.saveToDB(userData.data, token)
            .catch((error) => {
                throw new Error("There was error saving user in DB");
            });
    }
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
