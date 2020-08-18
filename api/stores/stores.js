const { express } = require('../../server');
const router = express.Router();
const { addStore, editStore, deleteStore, getStore, categories }
    = require('../../lib/model/modelController');

// add store
router.post('/', async (request, response) => {
    const store = request.body;
    // categories.validateCategory(store.categories);
    console.log('in api/stores/');
    addStore(store)
        .then(() => {
            console.log('in then property --> add store');
            response.send('store added successfully');
        });
});

// edit store
router.post('/:id', async (request, response) => {
    const store = request.body;
    const { id } = request.params;
    // categories.validateCategory(store.categories);

    editStore(id, store)
        .then((res) => {
            response.send(res);
        });
});

//delete store
router.delete('/:id', async (request, response) => {
    const { id } = request.params;
    deleteStore(id)
        .then((res) => {
            response.send(res);
        });
});
// get specific store
router.get('/getstore/', async (request, response) => {
    const { id } = request.query;
    console.log('in get store' + id);
    getStore(id)
        .then((res) => {
            response.send(res);
        });
});

// get all stores
router.get('', async (request, response) => {
    getStore()
        .then((res) => {
            response.send(res);
        });
});

module.exports = router;