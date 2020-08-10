// add this file to .gitignore (these are secret keys!)
const md5 = require('md5');

const tokenSecret = "A&jas&@()KAL)@_2141!~$sdA@";

const createToken = async (string) => {
    return await md5(string + tokenSecret);
}

module.exports = {
    session: {
        cookieKey: 'somestringthathelpstoencryptthecookieyesyealkas'
    },
    facebook: {
        appID: '659049138177638',
        appSecret: '29d3905e2d6b126f7756db877591803d'
    },
    createToken
};