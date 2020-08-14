const { express } = require('../../server');
const router = express.Router();
const modelController = require('../../lib/model/modelController');

router.get('', async (request, response) => {
    const { categories, distance,  coordinates} = request.query;
    
    modelController.findByCategory(categories, distance, coordinates)
        .then((stores) => {
            response.send(stores);
        });
});

module.exports = router;