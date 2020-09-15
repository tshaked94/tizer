const { findByCategory, editStore, getDealsStore, deleteStore, getStore, deleteTizer, getLastTizers, getNearbyStores } = require('./store/store')
const { categories } = require('./store/category');
const { checkToken, login } = require('./user/login');
const { getUserStores } = require('./user/userstores');
const { addDeal, editDeal, deleteDeal, getDeal, getDealsLocation } = require('./deal/deal');
const { addStore, addReview, getStoreReviews } = require('../model/user/userstores');
const { uploadPhoto, uploadBulkPhoto } = require('./utils/image');
const { addMessage, getBusinessChat } = require('../model/chat/chat');
// const {getDateTime, timeUnits} = require('./utils/date')

module.exports = {
    //storeModel
    findByCategory,
    editStore,
    getStore,
    deleteStore,
    getDealsStore,

    //userStores
    getUserStores,
    addStore,
    addReview,
    getStoreReviews,
    getNearbyStores,

    //deals
    addDeal,
    editDeal,
    deleteDeal,
    getDeal,
    getDealsLocation,

    uploadPhoto,
    uploadBulkPhoto,
    deleteTizer,
    getLastTizers,

    //categories
    categories,

    //chat
    addMessage,
    getBusinessChat,

    //userLogin
    checkToken,
    login

    //date
    // getDateTime,
    // timeUnits
};