const { express } = require('../../../server');
const router = express.Router();
const tizersRoutes = require('./tizers/tizers');
const { uploadPhoto, uploadBulkPhoto } = require('../../../lib/model/modelController');

router.use('/tizer', tizersRoutes);
router.post('/:id', async (request, response) => { // upload photo for specific store
    console.log('in upload store photo');
    const { id } = request.params;
    const { image, userID } = request.body;
    link = await uploadPhoto(id, image, userID, 'store');
    response.send(link);
});

router.delete('/:id', async (request, response) => {
    console.log('in delete store photo');
});

module.exports = router;