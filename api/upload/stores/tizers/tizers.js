const { express } = require('../../../../server');
const router = express.Router();
const { uploadPhoto } = require('../../../../lib/model/modelController');
const { response } = require('express');

router.post('/:id', async (req, res) => {
    console.log('in upload tizer');
    const { id } = req.params;
    const { image } = request.body;
    link = await uploadPhoto(id, image, "tizer");
    response.send(link);
});

module.exports = router;