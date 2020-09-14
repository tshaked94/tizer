const { connection, connectDB } = require('./connection');
const { saveToDB, updateUser, findUser } = require('./user/user');
const { date } = require('../lib/model/utils/date');
const { dbUploadPhoto } = require('./utils/image');
const { findStore, saveStore, editStore, deleteStore, findStoreReviewObj, findStoreRlReviews, saveReview, addReviewToStore, deleteTizer } = require('./store/store');
const { getChatFromStoreID, saveMessage, addMesssageToChat } = require('./chat/chat');
const { getUserStores, addStoreToUserStore } = require('./user/userstores');
const { saveDeal, editDeal, deleteDeal, getDeal, findDeal, filterExpiredDeals } = require('./deal/deal');


module.exports = {
    //connections
    connectDB,
    connection,

    //store
    findStore,
    saveStore,
    editStore,
    deleteStore,
    findStoreReviewObj,
    findStoreRlReviews,
    addReviewToStore,
    saveReview,

    dbUploadPhoto,
    deleteTizer,
    //date
    date,

    //deal
    saveDeal,
    editDeal,
    deleteDeal,
    getDeal,
    findDeal,
    filterExpiredDeals,

    //user
    saveToDB,
    updateUser,
    findUser,

    //userStores
    getUserStores,
    addStoreToUserStore,

    //chat
    getChatFromStoreID, 
    saveMessage,
    addMesssageToChat
};