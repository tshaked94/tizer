const { express } = require('../../server');
const router = express.Router();
const modelController = require('../../lib/model/modelController');
// const { categories } = require('../../lib/model/modelController');
// const store = require('../../lib/model/store/store');
// const categories = require('../../lib/model/store/category');
const { categories } = modelController;


router.post('/', async (request, response) => {
    const newStore = request.body;

    categories.validateCategory(newStore.categories);
    console.log(newStore.categories);

    modelController.addStore(newStore)
        // .catch((error) => {
        //     console.log(error);
        //     throw error;
        // })
        .then((res) => {
            response.send(res);
        });
});

router.get('/', async (request, response) => {
    const { id } = request.query;
    modelController.getStore(id)
        // .catch((error) => {
        //     console.log(error);
        //     throw error;
        // })
        .then((res) => {
            response.send(res);
        });
});

module.exports = router;