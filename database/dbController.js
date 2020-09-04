const { connection, connectDB } = require('./connection');
const { saveToDB, updateUser, findUser } = require('./user/user');
const { date } = require('../lib/model/utils/date');
const { dbUploadPhoto } = require('./utils/image');
const { findStore, saveStore, editStore, deleteStore, addFirstReview, findStoreReviewObj, findStoreRlReviews, saveReview, addReviewToStore } = require('./store/store');
const { getUserStores, findUserStoreObj, saveNewUserStore, addStoreToUserStore } = require('./user/userstores');
const { saveDeal, editDeal, deleteDeal, getDeal } = require('./deal/deal');


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
    addFirstReview,
    addReviewToStore,
    saveReview,

    dbUploadPhoto,

    //date
    date,

    //deal
    saveDeal,
    editDeal,
    deleteDeal,
    getDeal,

    //user
    saveToDB,
    updateUser,
    findUser,

    //userStores
    getUserStores,
    saveNewUserStore,
    addStoreToUserStore,
    findUserStoreObj
};