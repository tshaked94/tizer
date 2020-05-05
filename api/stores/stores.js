const express = require('../../server').express;
const router = express.Router();
const storeModel = require('../../lib/model/store/store');

router.post('/', async (request, response) => {
    // add store
    storeModel.addStore(request.body).then((res) => {
        console.log('Store ' + res + ' added successfully');
    });
});

module.exports = router;