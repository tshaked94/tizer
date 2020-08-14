const { express } = require('../../server');
const router = express.Router();
const modelController = require('../../lib/model/modelController');
const { categories } = modelController;


router.post('/', async (request, response) => { // add store
    const store = request.body;
    // categories.validateCategory(store.categories);

    modelController.addStore(store)
    // .catch((error) => {
    //     console.log(error);
    //     throw error;
    // })
    .then((res) => {
        response.send(res);
    });
});

router.post('/:id', async (request, response) => { // edit store
    const store = request.body;
    const id = request.params.id;
    // categories.validateCategory(store.categories);

    modelController.editStore(id, store)
    // .catch((error) => {
    //     console.log(error);
    //     throw error;
    // })
    .then((res) => {
        response.send(res);
    });
});

router.delete('/:id', async (request, response) => {
    const id = request.params.id;
    modelController.deleteStore(id)
        // .catch((error) => {
    //     console.log(error);
    //     throw error;
    // })
    .then((res) => {
        response.send(res);
    });
});

router.get('/:id', async (request, response) => { // get specific store
    const id = request.params.id;
    modelController.getStore(id)
        // .catch((error) => {
        //     console.log(error);
        //     throw error;
        // })
        .then((res) => {
            response.send(res);
        });
});

router.get('', async (request, response) => { // get all stores
    modelController.getStore()
        // .catch((error) => {
        //     console.log(error);
        //     throw error;
        // })
        .then((res) => {
            response.send(res);
        });
});

module.exports = router;