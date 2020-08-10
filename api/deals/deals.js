const { express } = require('../../server');
const router = express.Router();
const modelController = require('../../lib/model/modelController');

router.get('', async (request, response) => {
    const { category, distance, userCoordinates, id } = request.query;

    modelController.findByCategory(category, distance, userCoordinates, id)
        .then((stores) => {
            response.send(stores);
        });
});

module.exports = router;