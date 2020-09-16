const { findUser, findStore, getChatFromStoreID, saveMessage, addMesssageToChat }
    = require('../../../database/dbController');
const { validateObject } = require('../utils/validateUtils');

const addMessage = async (storeID, userID, textMessage) => {

    await validateMessageParams(storeID, userID);

    const user = await findUser({ _id: userID });
    const { name, picture: { url } } = user;

    const chatID = (await getChatFromStoreID(storeID))._id;
    console.log('chat id is: ' + chatID);

    const message = await saveMessage({
        user: {
            _id: userID,
            name: name,
            avatar: url
        },
        text: textMessage
    });
    console.log('message was saved: ');
    console.log(message);

    await addMesssageToChat(message, chatID);

    return 'message added successfully';
}

const getBusinessChat = async (storeID) => {
    validateObject(await findStore({ _id: storeID }),
        'id is invalid doesn\'t compatible to any Store');

    return await getChatFromStoreID(storeID);
}

const validateMessageParams = async (storeID, userID) => {
    validateObject(await findStore({ _id: storeID }),
        'id is invalid doesn\'t compatible to any Store');

    validateObject(await findUser({ _id: userID }),
        'id is invalid doesn\'t compatible to any User');
}

module.exports = {
    addMessage,
    getBusinessChat
}