const Store = require('../schemas/store/Store');
const rlUserStore = require('../schemas/rlUserStore/rlUserStore');

async function findStore(attribute) {
    return Store.find({});
}

async function saveStore(store) {
    let storeModel = new Store(store);
    await storeModel.save();
    let rlUserStoreModel = new rlUserStore({userID: store.userID, storeID: storeModel.id});
    await rlUserStoreModel.save();
    return storeModel;
}

module.exports = {
    saveStore: saveStore,
    findStore: findStore
};