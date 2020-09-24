const { findStore } = require('../store/store');
const { model: messageModel } = require('../schemas/chat/Message');
const { model: chatModel } = require('../schemas/chat/Chat');
const { storeModel } = require('../schemas/store/Store');
const { filterExpiredDeals } = require('../deal/deal');

const getChatFromStoreID = async (storeID) => {
    return (await storeModel
        .findById({ _id: storeID })
        .populate('chat')).chat;
}

const saveMessage = async (messageObj) => {
    const newMessage = new messageModel(messageObj);

    await newMessage
        .save()
        .catch((err) => {
            throw new Error(err.message);
        });

    return newMessage;
}

const addMesssageToChat = async (message, chatID) => {

    await chatModel
        .updateMany(
            { _id: chatID },
            { $push: { messages: message } })
        .exec()
        .catch((err) => {
            throw new Error(err.message);

        });
}

// const deleteChat = async (filter) => {
//     await chatModel.deleteOne(filter).exec();
// }

module.exports = {
    // deleteChat,
    getChatFromStoreID,
    saveMessage,
    addMesssageToChat
}