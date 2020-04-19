const app = require('../../../server').app;
const axios = require('axios');
const access_token = require('../../config/config').facebook.access_token;

const payLoad = {
    queryTerm: 'User',
    searchType: 'User'
};

var login = function(accessToken){
    axios({
        method: "GET",
        url: `https://graph.facebook.com/me?access_token=${access_token}`,
    }).then((response) => {
        return response;
    });
}

module.exports = login;
