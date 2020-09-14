const axios = require('axios');
const keys = require('../../config/keys');
const { facebook } = require('../../config/config');
const { getDateTime, timeUnits, findUser, saveToDB, updateUser } = require('../../../database/dbController');

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

    // console.log(userData);
    //validateUser();
    const token = await keys.createToken(userData.data.id + accessToken);
    console.log(userData.data);

    //prepare data for db actions
    const expirationDate = getDateTime(timeUnits.month, 2);
    const facebookID = { 'facebookID': userData.data.id };
    const updateOptions = {
        tizerToken: token,
        tokenExpiredDate: expirationDate
    };

    const user = await findUser(facebookID, updateOptions);

    user != null ? await updateUser(facebookID, updateOptions) :
        await saveToDB(userData.data, token);

    return token;
}

const checkToken = async (token) => {
    const user = await findUser({ tizerToken: token });

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
