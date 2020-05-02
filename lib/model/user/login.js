const axios = require('axios');
const keys = require('../../config/keys');
const facebook = require('../../config/config').facebook;

const UserSchema = require('../../../lib/database/schemas/User');
const User = require('../user');

const TokenExpiredError = require('../../error/token').TokenExpiredError;
const InvalidTokenError = require('../../error/token').InvalidTokenError;


var login = async function (accessToken) {
    let result;
 
    var userData = await axios.get(facebook.graphApiURL + '/me', {
        params: {
            access_token: accessToken,
            fields: facebook.fields,
        }
    });
    var token = await keys.createToken(userData.data.id + accessToken);
    //todo:
    //user that connect already once - need to update its details in db
    await User.saveToDB(userData.data, token)
        .then(() => {
            result = token;
        })
        .catch((error) => {
            console.log(error)
        });

    return result;
}

var checkToken = async function (token) {
    let result;
    await UserSchema.findOne({ tizerToken: token })
        .then(function (user) {
            if (user) {
                if (user.tokenExpiredDate < Date.now()) {
                    throw new TokenExpiredError('Token Expired!');
                }
                
                result = user;
            } else {
                throw new InvalidTokenError('Invalid Token');
            }
        });

    return result;
}

module.exports = {
    login: login,
    checkToken: checkToken
}
