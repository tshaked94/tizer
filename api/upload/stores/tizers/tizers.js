const { express } = require('../../../../server');
const router = express.Router();
const { uploadPhoto, uploadBulkPhoto, deleteTizer, getLastTizers } = require('../../../../lib/model/modelController');
const { response } = require('express');

router.post('/:id', async (request, response) => {
    console.log('in upload tizer');
    const { id } = request.params;
    const { image, userID, message } = request.body;
    uploadPhoto(id, image, userID, 'tizer', message)
        .then(() => {
            response.send('Tizer added successfully');
        }).catch((err) => {
            response.status(400).send(err.message);
        });
});

router.delete('/:id', async (request, response) => {
    console.log('in delete tizer');
    const { id } = request.params;
    const { storeID } = request.query;
    deleteTizer(id, storeID)
        .then(() => {
            response.send('Tizer deleted successfully');
        }).catch((err) => {
            response.status(400).send(err.message);
        });
});

router.get('/', async (request, response) => {
    getLastTizers()
        .then((tizers) => {
            response.send(tizers);
        })
        .catch ((err) => {
            response.status(400).send(err.message);
        })
});

module.exports = router;