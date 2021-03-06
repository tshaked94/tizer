const { express } = require('../../server');
const router = express.Router();
const { findByCategory, addDeal, editDeal, deleteDeal,
    getDealsLocation, getDeal } = require('../../lib/model/modelController');


//get deals around
router.get('', async (request, response) => {
    const { category, distance, latitude, longtitude } = request.query;
    // const coordinates = JSON.parse(coordinatesFromQuery);
    const coordinates = { latitude, longtitude };

    // filterExpiredDeals();
    findByCategory(category, distance, coordinates)
        .then((stores) => {
            response.send(stores);
        }).catch((err) => {
            console.log('in error func');
            response.status(400).send(err.message);
        });
});

//add deal
router.post('', async (request, response) => {
    const deal = request.body;

    addDeal(deal)
        .then((res) => {
            response.send(res);
        }).catch((err) => {
            console.log('in error func');
            response.status(400).send(err.message);
        });
});

//edit deal
router.post('/:id', async (request, response) => {
    const deal = request.body;
    const { id } = request.params;
    editDeal(id, deal)
        .then((res) => {
            response.send(res);
        }).catch((err) => {
            console.log(err.message);
            response.status(400).send(err.message);
        });
});

//delete deal
router.delete('/:id', async (request, response) => {
    const { id } = request.params;

    deleteDeal(id)
        .then((res) => {
            response.send(res);
        }).catch((err) => {
            console.log('in error func');
            response.status(400).send(err.message);
        });
});

router.get('/location', async (request, response) => {
    console.log('in api/deals/location');
    const { dealsID } = request.query;

    // console.log(dealsID);
    getDealsLocation(dealsID)
        .then((res) => {
            response.send(res);
        }).catch((err) => {
            console.log('in error func');
            response.status(400).send(err.message);
        });
});

//get deal
router.get('/:id', async (request, response) => {
    const { id } = request.params;
    console.log('in api/deals/getdeal');
    getDeal(id)
        .then((res) => {
            response.send(res);
        }).catch((err) => {
            console.log('in error func');
            response.status(400).send(err.message);
        });
});


module.exports = router;