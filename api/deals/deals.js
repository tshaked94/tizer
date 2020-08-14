const { express } = require('../../server');
const router = express.Router();
const modelController = require('../../lib/model/modelController');

router.get('', async (request, response) => {
    const { categories, distance, coordinates} = request.query;

    modelController.findByCategory(categories, distance, coordinates)
        .then((stores) => {
            response.send(stores);
        });
});

router.post ('', async (request, response) => {
    const deal = request.body;

    modelController.addDeal(deal)
    .then((res) => {
        response.send(res);
    });
});


router.post ('/:id', async (request, response) => {
    const deal = request.body;
    const id = request.params.id;
    
    modelController.editDeal(id, deal)
    .then((res) => {
        response.send(res);
    });
});

router.delete ('/:id', async (request, response) => {
    const id = request.params.id;

    modelController.deleteDeal(id)
    .then((res) => {
        response.send(res);
    });
});

module.exports = router;