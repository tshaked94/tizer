const router = require('../../../server').express.Router();
const userLogin = require('../../../lib/model/user/login');
const User = require('../../../lib/database/schemas/user/User');

router.get('/tizer', async (request, response) => {

    console.log('in api/user/login/tizer');
    response.send('its still you');
    // userLogin.checkToken(request.get('token'))
    //     .then((result) => {
    //         console.log('in result');
    //         console.log(result);
    //         response.send(result);
    //     })
});

router.get('/facebook', async (request, response) => {
    console.log('in api/user/login/facebook');
    console.log(request.get('access_token'));

    response.send(1593620856209);

    // await userLogin.login(request.get('access_token'))
    //     .then((token) => {
    //         console.log('in cb func');
    //         response.send(token);
    //     })
    //     .catch((err) => {
    //         console.log('in catch login facenook block');
    //     });
});

module.exports = router;