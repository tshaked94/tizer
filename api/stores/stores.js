const { express } = require('../../server');
const router = express.Router();
const modelController = require('../../lib/model/modelController');
const { categories } = modelController;


router.post('/', async (request, response) => {
    const newStore = request.body;

    categories.validateCategory(newStore.categories);
    console.log(newStore.categories);

    modelController.addStore(newStore)
        .then((res) => {
            response.send(res);
        });
});

router.get('/', async (request, response) => {
    const { id } = request.query;
    modelController.getStore(id)
        .then((res) => {
            response.send(res);
        });
});

module.exports = router;