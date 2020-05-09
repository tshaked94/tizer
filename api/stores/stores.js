const express = require('../../server').express;
const router = express.Router();
const store = require('../../lib/model/store/store');


router.post('/', async (request, response) => {
    // add store
    //need to validate category??
    store.addStore(request.body).then((res) => {
        console.log('Store ' + res + ' added successfully');
    });
});

module.exports = router;