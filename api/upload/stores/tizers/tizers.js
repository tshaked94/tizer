const { express } = require('../../../../server');
const router = express.Router();
const { uploadPhoto } = require('../../../../lib/model/modelController');

router.post('/:id', async (req, res) => {
    console.log('in upload tizer');
    const { id } = req.params;
    uploadPhoto(id, req, res, "tizer");
});

module.exports = router;