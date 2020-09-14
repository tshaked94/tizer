const { express } = require('../../server');
const router = express.Router();
const { addMessage, getBusinessChat } = require('../../lib/model/modelController');


//adding message
router.post('', async (request, response) => {
    console.log('in api/chat addMessage');
    const { storeID, userID, textMessage } = request.query;

    addMessage(storeID, userID, textMessage)
        .then((result) => {
            console.log('in then cn func \'addMessage\'');
            response.send(result);
        }).catch((error) => {
            console.log('in error func \'addMessage\'');
            response.status(400).send(error.message);
        })
});

//get all business messages
router.get('/:storeID', async (request, response) => {
    console.log('in api/chat getBusinessChat');
    const { storeID } = request.params;

    getBusinessChat(storeID)
        .then((result) => {
            console.log('in then cn func \'getBusinessChat\'');
            response.send(result);
        }).catch((error) => {
            console.log('in error func \'getBusinessChat\'');
            response.status(400).send(error.message);
        })
});

module.exports = router;