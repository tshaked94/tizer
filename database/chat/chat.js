const { findStore } = require('../store/store');
const { model: messageModel } = require('../schemas/chat/Message');
const { model: chatModel } = require('../schemas/chat/Chat');
const Store = require('../schemas/store/Store');
const { errMsg } = require('../utils/constants');
const { update } = require('../schemas/user/User');

const getChatFromStoreID = async (storeID) => {
    return (await Store
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

module.exports = {
    getChatFromStoreID,
    saveMessage,
    addMesssageToChat
}