const { express } = require('../../../../server');
const router = express.Router();
const { uploadPhoto, uploadBulkPhoto, deleteTizer } = require('../../../../lib/model/modelController');
const { response } = require('express');

router.post('/:id', async (request, response) => {
    console.log('in upload tizer');
    const { id } = request.params;
    const { image, userID } = request.body;
    link = await uploadPhoto(id, image, userID, 'tizer');
    response.send(link);
});

router.delete('/:id', async (request, response) => {
    console.log('in delete tizer');
    const { id } = request.params;
    const { storeID } = request.query;
    res = await deleteTizer(id, storeID);
    response.send(res);
});

module.exports = router;