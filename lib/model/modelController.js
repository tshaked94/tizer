const { findByCategory, editStore, getDealsStore, deleteStore, getStore } = require('./store/store')
const { categories } = require('./store/category');
const { checkToken, login } = require('./user/login');
const { getUserStores } = require('./user/userstores');
const { addDeal, editDeal, deleteDeal, getDeal } = require('./deal/deal');
const { addStore, addReview, getStoreReviews } = require('../model/user/userstores');
const { uploadPhoto } = require('./utils/image');

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

    //deals
    addDeal,
    editDeal,
    deleteDeal,
    getDeal,

    uploadPhoto,

    //categories
    categories,

    //userLogin
    checkToken,
    login
};