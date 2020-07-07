const Store = require('../schemas/store/Store');

async function findStore(attribute) {
    return Store.find({});
}

async function saveStore(store) {
    let storeModel = new Store(store);
    await storeModel.save();
}

module.exports = {
    saveStore: saveStore,
    findStore: findStore
};