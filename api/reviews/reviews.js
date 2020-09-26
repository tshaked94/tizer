const { express } = require('../../server');
const router = express.Router();
const { addReview, getStoreReviews }
    = require('../../lib/model/modelController');

// add review
router.post('/', async (request, response) => {
    const review = request.body;
    addReview(review)
        .then((res) => {
            response.send(res);
        }).catch((err) => {
            response.status(400).send(err.message);
        });
});

router.post('/:id', async (request, response) => { // edit review(?)

});

router.get('/:storeid', async (request, response) => { // get specific store reviews
    const { storeid } = request.params;
    getStoreReviews(storeid)
        .then((res) => {
            response.send(res);
        }).catch((err) => {
            response.status(400).send(err.message);
        });
});

module.exports = router;