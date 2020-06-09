const axios = require('axios');
const keys = require('../../config/keys');
const facebook = require('../../config/config').facebook;
const UserSchema = require('../../../lib/database/schemas/user/User');
const User = require('../user');

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
            throw new Error('There was a problem retrieving user information');
        });

    console.log(userData);

    const token = await keys.createToken(userData.data.id + accessToken);
    //todo:
    //user that connect already once -
    //need to search if already appear in db with other tizer token
    console.log(userData.data);
    await UserSchema.findOne({'facebookID' : userData.data.id}).then(async function(user){
        if(user){
            await UserSchema.updateOne({'facebookID' : userData.data.id}, {
                tizerToken: token
            }, function(err, affected, resp){
                console.log(resp);
            });
        }else{
            await User.saveToDB(userData.data, token)
            .catch((error) => {
                throw new Error("There was error saving user in DB");
            });
        }
    }).catch((err) => {
        throw new Error('Error on finding user before save');
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
