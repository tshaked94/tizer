const connector = require('./connection');
const user = require('./user/user');
const date = require('../lib/model/utils/date');
const store = require('./store/store');
const userStores = require('../lib/model/user/stores');

module.exports = {
    connectDB: connector.connectDB,
    connection: connector.connection,

    findStore: store.findStore,
    saveStore: store.saveStore,

    date: date,

    saveUserToDB: user.saveToDB,
    updateUser: user.updateUser,
    findUser: user.findUser,
    getUserStores: userStores.getUserStores
};