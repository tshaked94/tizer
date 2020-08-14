const router = require('../../../server').express.Router();
const modelController = require('../../../lib/model/modelController');

router.get('/:id', async (request, response) => {
    const userID = request.params.id;
    modelController.getUserStores(userID)
        .catch((err) => {
            response.status(400).send(err.message);
        })
        .then((result) => {
            response.send(result);
        })
});
module.exports = router;