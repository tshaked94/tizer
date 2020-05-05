const router = require('../../../server').express.Router();
const userLogin = require('../../../lib/model/user/login');
const User = require('../../../lib/database/schemas/user/User');

router.get('/tizer', async (request, response) => {

    console.log('in api/user/login/tizer');
    userLogin.checkToken(request.get('token'))
        .then((result) => {
            console.log('in result');
            console.log(result);
            response.send(result);
        })
});

router.get('/facebook', async (request, response) => {
    console.log('in api/user/login/facebook');
    console.log(request.get('access_token'));

    await userLogin.login(request.get('access_token'))
        .then((token) => {
            console.log('in cb func');
            response.send(token);
        }).catch((error) => {
            console.log(error.message)
            response.send(error);
        });
});

module.exports = router;