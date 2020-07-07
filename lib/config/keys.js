// add this file to .gitignore (these are secret keys!)
var md5 = require('md5');
var x = 2;

var tokenSecret = "A&jas&@()KAL)@_2141!~$sdA@";

var createToken = async function(string){
    var res = await md5(string + tokenSecret);
    return res;
}

module.exports = {
    session: {
        cookieKey: 'somestringthathelpstoencryptthecookieyesyealkas'
    },
    facebook:{
        appID: '659049138177638',
        appSecret: '29d3905e2d6b126f7756db877591803d'
    },
    createToken: createToken,
};