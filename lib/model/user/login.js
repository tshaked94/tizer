const axios = require('axios');
const keys = require('../../config/keys');
const { facebook } = require('../../config/config');
const db = require('../../../database/dbController');
const { getDateTime, timeUnits } = require('../utils/date');

const { TokenExpiredError, InvalidTokenError } = require('../../error/token');
const { validateUserCoord } = require('../utils/location');


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

    const user = await db.findUser(facebookID, updateOptions);

    user != null ? await db.updateUser(facebookID, updateOptions) :
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
