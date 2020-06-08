const express = require('../../server').express;
const router = express.Router();
const store = require('../../lib/model/store/store');
const categories = require('../../lib/model/store/category');


router.post('/', async (request, response) => {
    const newStore = request.body;
    
    categories.validateCategory(newStore.categories);
    
    console.log(newStore.categories);
    
    store.addStore(newStore)
        .catch((error) => {
            console.log(error);
        })
        .then(() => {
            response.send('Store added successfully!');
        });
});

module.exports = router;