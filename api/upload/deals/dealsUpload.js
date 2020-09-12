const { express } = require('../../../server');
const router = express.Router();
const { uploadPhoto } = require('../../../lib/model/modelController');

router.post('/:id', async (request, response) => { // upload photo for specific store
    console.log('in upload deal photo');
    console.log(request);
    console.log('===============================================');
    const { id } = request.params;
    const { image } = request.body;
    link = await uploadPhoto(id, image, 'deal');
    response.send(link);

});

module.exports = router;