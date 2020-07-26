const express = require('../../server').express;
const router = express.Router();
const modelController = require('../../lib/model/modelController');

router.get('', async (request, response) => {
    var category = request.query.category;
    var distance = request.query.distance;
    var userCoordinates = request.query.coordinates;
    var id = request.query.id;

    modelController.findByCategory(category, distance, userCoordinates, id)
        .then((stores) => {
            response.send(stores);
        });
});

module.exports = router;