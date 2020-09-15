const axios = require('axios');
const { createToken, facebook: { appID, appSecret } } = require('../../config/keys');
const { facebook: { graphApiURL, fields } } = require('../../config/config');
const { getDateTime, timeUnits, findUser, saveToDB, updateUser } = require('../../../database/dbController');
const { getTimeSinceEpoch } = require('../utils/date');
const { TokenExpiredError, InvalidTokenError } = require('../../error/token');


const login = async (accessToken) => {

    const longLivedAccessToken = await getLongLivedAccessToken(accessToken);

    const userData = await axios.get(graphApiURL + '/me',
        {
            params: {
                access_token: longLivedAccessToken.accessToken,
                fields: fields
            }
        })
        .catch((err) => {
            throw new Error('Invalid Access Token');
        });

    const userFacebook = userData.data;
    userFacebook.longLivedAccessToken = longLivedAccessToken;

    console.log('user retrieved from facebook is: ----->');
    console.log(userFacebook);
    const token = await createToken(userFacebook.id + accessToken);

    //prepare data for db actions
    const expirationDate = getDateTime(timeUnits.month, 2);
    const facebookID = { facebookID: userFacebook.id };
    const updateOptions = {
        tizerToken: token,
        tokenExpiredDate: expirationDate,
        longLivedAccessToken: longLivedAccessToken
    };

    const user = await findUser(facebookID);

    user != null ? await updateUser(facebookID, updateOptions) :
        await saveToDB(userFacebook, token);

    return token;
}

const checkToken = async (token) => {
    const user = await findUser({ tizerToken: token });

    if (!user) {
        throw new InvalidTokenError('Invalid Token');
    }

    if (user.tokenExpiredDate < getTimeSinceEpoch()) {
        throw new TokenExpiredError('Tizer Token Expired!');
    }

    if (user.longLivedAccessToken.expirationDate < getTimeSinceEpoch()) {
        throw new TokenExpiredError('Long Lived Access Token Token Expired!');
    }

    return user;
}
const getLongLivedAccessToken = async (accessToken) => {
    const params = {
        grant_type: 'fb_exchange_token',
        client_id: appID,
        client_secret: appSecret,
        fb_exchange_token: accessToken
    }

    const result = await axios.get(graphApiURL + '/oauth/access_token', { params })
    console.log('long lived access token is: ');
    console.log(result.data);

    return {
        accessToken: result.data.access_token,
        expirationDate: getTimeSinceEpoch(Date.now() + result.data.expires_in * 1000)
    }
}

module.exports = {
    login,
    checkToken
}
