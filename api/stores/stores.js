const { express } = require('../../server');
const router = express.Router();
const { addStore, editStore, deleteStore, getStore, getDealsStore }
    = require('../../lib/model/modelController');
// add store
router.post('/', async (request, response) => {
    const store = request.body;
    addStore(store)
        .then(() => {
            console.log('in then property --> add store');
            response.send('store added successfully');
        }).catch((err) => {
            console.log(err.message);
            response.status(400).send(err.message);
        });
});

// edit store
router.post('/:id', async (request, response) => {
    const store = request.body;
    const { id } = request.params;

    editStore(id, store)
        .then((res) => {
            response.send(res);
        }).catch((err) => {
            console.log('in error func');
            response.status(400).send(err.message);
        });
});

//delete store
router.delete('/:id', async (request, response) => {
    const { id } = request.params;
    deleteStore(id)
        .then((res) => {
            response.send(res);
        }).catch((err) => {
            console.log('in error func');
            response.status(400).send(err.message);
        });
});
// get specific store
router.get('/:id', async (request, response) => {
    const { id } = request.params;
    console.log('in get store' + id);
    getStore(id)
        .then((res) => {
            response.send(res);
        }).catch((err) => {
            console.log('in error func');
            response.status(400).send(err.message);
        });
});

// get all stores
router.get('', async (request, response) => {
    getStore()
        .then((res) => {
            response.send(res);
        }).catch((err) => {
            console.log('in error func');
            response.status(400).send(err.message);
        });
});

router.get('/deals/:id', async (request, response) => {
    console.log('in /api/stores/deals');
    const { id } = request.params;

    getDealsStore(id)
        .then((res) => {
            response.send(res);
        }).catch((err) => {
            console.log('in error func');
            response.status(400).send(err.message);
        });
});

module.exports = router;