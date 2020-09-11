const { express } = require('../../../server');
const router = express.Router();
const { uploadPhoto, uploadBulkPhoto } = require('../../../lib/model/modelController');

router.post('/:id', async (request, response) => { // upload photo for specific store
    console.log('in upload deal photo');
    const { id } = request.params;
    const { image, userID } = request.body;
    link = await uploadPhoto(id, image, userID, 'deal');
    response.send(link);

});

router.delete('/:id', async (request, response) => {
    console.log('in delete deal photo');
});

module.exports = router;