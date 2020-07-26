const router = require('../../../server').express.Router();
const modelController = require('../../../lib/model/modelController');

router.get('/', async (request, response) => {
    const userID = request.query.userID;
    modelController.getUserStores(userID)
    .catch((err) => {
        response.status(400).send(err.message);
    })
    .then((result) => {
        response.send(result);
    })
});
module.exports = router;