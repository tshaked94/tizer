const { model: messageModel } = require('../schemas/chat/Message');
const { model: chatModel } = require('../schemas/chat/Chat');
const { storeModel } = require('../schemas/store/Store');
const { errMsg } = require('../utils/constants');

const getChatFromStoreID = async (storeID) => {

    let storeWithChat;
    try {
        storeWithChat = (await storeModel
            .findById({ _id: storeID })
            .populate('chat'));
    }
    catch (err) {
        throw new Error(errMsg('find', 'store') + err.message);
    }

    return storeWithChat.chat;
}

const saveMessage = async (messageObj) => {
    const newMessage = new messageModel(messageObj);

    await newMessage
        .save()
        .catch((err) => {
            throw new Error(errMsg('save', 'message') + err.message);
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
            throw new Error(errMsg('update', 'chat') + err.message);
        });
}

module.exports = {
    getChatFromStoreID,
    saveMessage,
    addMesssageToChat
}