const { connection, connectDB } = require('./connection');
const { saveToDB, updateUser, findUser } = require('./user/user');
const { date } = require('../lib/model/utils/date');
const { findStore, saveStore, editStore, deleteStore } = require('./store/store');
const { getUserStores } = require('../lib/model/user/stores');
const { saveDeal, editDeal, deleteDeal } = require('./deal/deal');

module.exports = {
    //connections
    connectDB,
    connection,

    //store
    findStore,
    saveStore,
    editStore,
    deleteStore,

    //date
    date,

    //deal
    saveDeal,
    editDeal,
    deleteDeal,

    //user
    saveToDB,
    updateUser,
    findUser,

    //userStores
    getUserStores
};