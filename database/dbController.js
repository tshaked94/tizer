const { connection, connectDB } = require('./connection');
const { saveToDB, updateUser, findUser } = require('./user/user');
const { date } = require('../lib/model/utils/date');
const { findStore, saveStore } = require('./store/store');
const { getUserStores } = require('../lib/model/user/stores');


module.exports = {
    //connections
    connectDB,
    connection,

    //store
    findStore,
    saveStore,

    //date
    date,

    //user
    saveToDB,
    updateUser,
    findUser,

    //userStores
    getUserStores
};