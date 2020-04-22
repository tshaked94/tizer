const axios = require('axios');
const keys = require('../../config/keys');
const facebook = require('../../config/config').facebook;
const User = require('../../../lib/database/schemas/User');


var saveToDB = async function (user, token) {
    var date = new Date();
    date.setMonth(date.getMonth() + 2);
    var expirationDate = date.getTime();
    let newUser = {
        facebookID: user.id,
        tizerToken: token,
        tokenExpiredDate: expirationDate,
        email: user.email,
        name: user.name,
        birthday: user.birthday,
        link: user.link,
        picture: user.picture.data
    };

    let userModel = new User(newUser);

    await userModel.save(function (err, user) {
        if (err) {
            console.log(err);
            throw(err);
        } else {
            console.log('User saved');
        }
    });
}

var login = async function (accessToken, callBack) {
    try {
        var userData = await axios.get(facebook.graphApiURL + '/me', {
            params: {
                access_token: accessToken,
                fields: facebook.fields,
            }
        });
        var token = await keys.createToken(userData.data.id + accessToken);
        await saveToDB(userData.data, token, callBack).then(() => {
            callBack(token);
        });
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}

var checkToken = async function (token, cbFunc) {
    let result;
    await User.findOne({ tizerToken: token }).then(function (user) {
        if (user) {
            if (user.tokenExpiredDate < Date.now()) {
                return cbFunc({ error: 'TOKEN_EXPIRED' });
            }
            return cbFunc(user);
        } else {
            return cbFunc({ error: 'INVALID_TOKEN' });
        }
    }).catch((err) => {
        throw err;
    });
}

module.exports = {
    login: login,
    checkToken: checkToken
}
