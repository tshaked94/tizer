const router = require('../../../server').express.Router();
const { getUserStores } = require('../../../lib/model/modelController');

router.get('/:id', async (request, response) => {
    const { id } = request.params;
    getUserStores(id)
        .catch((err) => {
            console.log('in error func');
            response.status(400).send(err.message);
        })
        .then((result) => {
            response.send(result);
        })
});
module.exports = router;