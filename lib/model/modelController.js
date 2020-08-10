const { findByCategory, addStore, getStore } = require('./store/store')
const { categories } = require('./store/category');
const { checkToken, login } = require('./user/login');
const { getUserStores } = require('./user/stores');

module.exports = {
    //storeModel
    findByCategory,
    addStore,
    getStore,

    //userStores
    getUserStores,

    //categories
    categories,

    //userLogin
    checkToken,
    login
};