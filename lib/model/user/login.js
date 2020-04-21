const axios = require('axios');
const keys = require('../../config/keys');
const facebook = require('../../config/config').facebook;
const User = require('../../../lib/database/schemas/User');

var login = async function (accessToken, apiToken) {
    //1. check if token is valid and not expired.
    //2. if token valid - return user data from db to front.
    //3. if token expired - return response to front requesting new facebook access token.
    try {
        //generate token
        //
        //3. HTTP request to facebook graph api - get info, save on db and return to front.
        // generate a token that the front will always come with(in the header).

        var userData = await axios.get(facebook.graphApiURL + '/me', {
            params: {
                access_token: accessToken,
                fields: facebook.fields,
            }
        });
        let newUser = {
            id: userData.data.id,
            token: longLivedAccessToken.data.access_token,
            tokenExpiredDate: expiredDate,
            email: userData.data.email,
            name: userData.data.name,
            birthday: userData.data.birthday,
            link: userData.data.link,
            picture: userData.data.picture.data
        };

        let userModel = new User(newUser);

        userModel.save(function (err, user) {
            if (err) {
                console.log(err);
                res.send(400, 'Bad request');
            } else {
                console.log('User saved');
            }
        });
    }
    catch (err) {
        console.error(err);
    }
}

var checkToken = function(token){
    // check if the api token is expired or not.
    // if it is - return a response to the front says that login with facebook is required.
    // if it is valid - return the data from the db to the front.
}

module.exports = {
    login: login,
    checkToken: checkToken
}
