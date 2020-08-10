const router = require('../../../server').express.Router();
const modelController = require('../../../lib/model/modelController');

router.get('/tizer', async (request, response) => {
    console.log('in api/user/login/tizer');
    modelController.checkToken(request.get('token'))
        .then((result) => {
            console.log('in result');
            console.log(result);
            response.send({ user: result });
        }).catch((err) => {
            response.status(400).send(err.message);
        })
});

router.get('/facebook', async (request, response) => {
    modelController.login(request.get('accessToken'))
        .then((token) => {
            console.log('in cb func');
            response.send({ tizerToken: token });
        })
        .catch((err) => {
            console.log('in error func');
            response.status(400).send({ error: err.message });
        });
});
module.exports = router;