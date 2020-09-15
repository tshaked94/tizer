const { express } = require('../../server');
const router = express.Router();
const { getNearbyStores }
    = require('../../lib/model/modelController');

router.get('/stores', async (request, response) => { // get nearby stores
    const { longtitude, latitude } = request.query;
    getNearbyStores(longtitude, latitude)
        .then((res) => {
            response.send(res);
        })
        .catch ((err) => {
            response.status(400).send(err.message);
        })
});

module.exports = router;