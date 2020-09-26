const { express } = require('../../../server');
const router = express.Router();
const { uploadPhoto } = require('../../../lib/model/modelController');

router.post('/:id', async (request, response) => { // upload photo for specific store
    console.log('in upload deal photo:');

    const { id } = request.params;
    const { image } = request.body;
    uploadPhoto(id, image, 'deal')
        .then((link) => {
            console.log('in uploadPhoto success!');
            response.send(link);
        }).catch((err) => {
            console.log('in error upload photo');
            response.status(400).send(err.message);
        });

});

module.exports = router;