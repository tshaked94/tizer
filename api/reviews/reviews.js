const { express } = require('../../server');
const router = express.Router();
const { addReview }
    = require('../../lib/model/modelController');
    
// add review
router.post('/', async (request, response) => {
    const review = request.body;
    addReview(review)
        .then((res) => {
            response.send(res);
        });
});

module.exports = router;