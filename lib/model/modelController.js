const { findByCategory, addStore, editStore, deleteStore, getStore } = require('./store/store')
const { categories } = require('./store/category');
const { checkToken, login } = require('./user/login');
const { getUserStores } = require('./user/stores');
const { addDeal,editDeal, deleteDeal } = require('./deal/deal');

module.exports = {
    //storeModel
    findByCategory,
    addStore,
    editStore,
    getStore,
    deleteStore,

    //userStores
    getUserStores,

    //deals
    addDeal,
    editDeal,
    deleteDeal,

    //categories
    categories,

    //userLogin
    checkToken,
    login
};