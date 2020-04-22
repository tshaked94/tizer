const router = require('../../../server').express.Router();
const userLogin = require('../../../lib/model/user/login');
const User = require('../../../lib/database/schemas/User');

router.get('/tizer', async (request, response) => {

    console.log('in api/user/login/tizer');
    userLogin.checkToken(request.get('token'), function(result){
        console.log(result);
        response.send(result);
    });

});

router.get('/facebook', async (request, response) => {
    console.log('in api/user/login/facebook');
    await userLogin.login(request.get('access_token'), function(token){
        response.send(token);
    });
});

module.exports = router;