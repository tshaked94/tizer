const router = require('../../../server').express.Router();
const userLogin = require('../../../lib/model/user/login');
const User = require('../../../lib/database/schemas/user/User');

router.get('/tizer', async (request, response) => {
    console.log('in api/user/login/tizer');
    userLogin.checkToken(request.get('token'))
        .then((result) => {
            console.log('in result');
            console.log(result);
            response.send({ user: result });
        })
});

router.get('/facebook', async (request, response) => {
    await userLogin.login(request.get('accessToken'))
        .then((token) => {
            console.log('in cb func');
            response.send({ tizerToken: token });
        })
        .catch((err) => {
            console.log('in error func');
            response.status(400).send({error: err.message});
        });
});
module.exports = router;