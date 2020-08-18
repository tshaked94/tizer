const db = require('../../../database/dbController');
const { addStoreToUserStore } = require('../../../database/user/userstores');


//return all the stores of the user that has id of userID
const getUserStores = async (userId) => {
    return db.getUserStores(userId);
}

const addStore = async (store) => {
    const storeModel = await db.saveStore(store);

    const { userID } = store;
    const { id: storeID } = storeModel;

    (await db.findUserStoreObj({ userID: userID })).length > 0 ?
        db.addStoreToUserStore(userID, storeID) :
        db.saveNewUserStore(userID, storeID);
}

module.exports = {
    getUserStores,
    addStore
}