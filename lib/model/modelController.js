const { findByCategory, editStore, deleteStore, getStore } = require('./store/store')
const { categories } = require('./store/category');
const { checkToken, login } = require('./user/login');
const { getUserStores } = require('./user/userstores');
const { addDeal, editDeal, deleteDeal, getDeal } = require('./deal/deal');
const { addStore } = require('../model/user/userstores');

module.exports = {
    //storeModel
    findByCategory,
    editStore,
    getStore,
    deleteStore,

    //userStores
    getUserStores,
    addStore,

    //deals
    addDeal,
    editDeal,
    deleteDeal,
    getDeal,

    //categories
    categories,

    //userLogin
    checkToken,
    login
};