const { express } = require('../../server');
const router = express.Router();
const modelController = require('../../lib/model/modelController');

//get deals around
router.get('', async (request, response) => {
    const { categories, distance, coordinates } = request.query;

    modelController.findByCategory(categories, distance, coordinates)
        .then((stores) => {
            response.send(stores);
        }).catch((err) => {
            response.status(400).send(err.message);
        });
});

//add deal
router.post('', async (request, response) => {
    const deal = request.body;

    modelController.addDeal(deal)
        .then((res) => {
            response.send(res);
        });
});

//edit deal
router.post('/:id', async (request, response) => {
    const deal = request.body;
    const { id } = request.params;

    modelController.editDeal(id, deal)
        .then((res) => {
            response.send(res);
        });
});

//delete deal
router.delete('/:id', async (request, response) => {
    const { id } = request.params;

    modelController.deleteDeal(id)
        .then((res) => {
            response.send(res);
        });
});

//get deal
router.get('/getdeal/', async (request, response) => {
    const { id } = request.query;
    console.log('in api/deals/getdeal');
    modelController.getDeal(id)
        .then((res) => {
            response.send(res);
        });
});

module.exports = router;