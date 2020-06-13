const express = require('../../server').express;
const router = express.Router();
const storeModel = require('../../lib/model/store/store');
const categories = require('../../lib/model/store/category');

router.get('', async (request, response) => {
    var category = request.query.category;
    var distance = request.query.distance;
    var userCoordinates = request.query.coordinates;

    console.log(category);
    console.log(distance);
    console.log(userCoordinates);

    //await categories.validateCategory([category]);

    storeModel.findByCategory(category, distance, userCoordinates)
        .then((stores) => {
            response.send(stores);
        });
});

module.exports = router;