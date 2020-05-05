const express = require('../../server').express;
const router = express.Router();
const storeModel = require('../../lib/model/store/store');

router.get('', async (request, response) => {
    var category = request.query.category;
    var distance = request.query.distance;
    var userCoordinates = request.query.coordinates;
    //TODO - validate category
    console.log(category, distance, userCoordinates);
    await storeModel.findByCategory(category, distance, userCoordinates).then((stores) => {
        console.log(stores);
        response.send(stores);
    });
});

module.exports = router;