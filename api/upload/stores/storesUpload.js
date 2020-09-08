const { express } = require('../../../server');
const router = express.Router();
const tizersRoutes = require('./tizers/tizers');
const { uploadPhoto } = require('../../../lib/model/modelController');

router.use('/tizer', tizersRoutes);
router.post('/:id', async (request, response) => { // upload photo for specific store
    console.log('in upload store photo');
    const { id } = request.params;
    const { image } = request.body;
    uploadPhoto(id, image, "store");
});

module.exports = router;