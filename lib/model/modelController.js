const storeModel = require('./store/store')
const categories = require('./store/category');
const userLogin = require('./user/login');


module.exports = {
    findByCategory: storeModel.findByCategory,
    addStore: storeModel.addStore,
    categories: categories,
    checkToken: userLogin.checkToken,
    login: userLogin.login
};