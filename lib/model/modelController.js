const storeModel = require('./store/store')
const categories = require('./store/category');
const userLogin = require('./user/login');
const userStores = require('./user/stores');

module.exports = {
    findByCategory: storeModel.findByCategory,
    addStore: storeModel.addStore,
    getStore: storeModel.getStore,
    getUserStores: userStores.getUserStores,
    categories: categories,
    checkToken: userLogin.checkToken,
    login: userLogin.login
};