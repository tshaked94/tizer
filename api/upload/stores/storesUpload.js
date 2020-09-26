const { express } = require('../../../server');
const router = express.Router();
const tizersRoutes = require('./tizers/tizers');
const { uploadPhoto, uploadBulkPhoto } = require('../../../lib/model/modelController');

router.use('/tizer', tizersRoutes);
router.post('/:id', async (request, response) => { // upload photo for specific store
    console.log('in upload store photo');
    const { id } = request.params;
    const { image, userID } = request.body;
    uploadPhoto(id, image, userID, 'store')
        .then((link) => {
            console.log('in uploadPhoto success!');
            response.send(link);
        }).catch((err) => {
            console.log('in error upload photo');
            response.status(400).send(err.message);
        });
});
    
module.exports = router;