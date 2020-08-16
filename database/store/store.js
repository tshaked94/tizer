const Store = require('../schemas/store/Store');
const rlUserStore = require('../schemas/rlUserStore/rlUserStore');
const {errMsg} = require('../utils/constants');

const findStore = () => {
    const foundStore = Store.find({})
        .populate('deals')
        .catch((err) => {
            errMsg('finding', 'Store');
        });

    return foundStore;
}

const deleteStore = async (id) => {
    deleted = await Store.deleteOne({_id: id});
    return deleted
}

const editStore = async (id, store) => {
    updatedStore = await Store.updateOne({_id: id}, store);
    return updatedStore;
}

const saveStore = async (store) => {
    const storeModel = new Store(store);

    await storeModel.save()
        .catch((err) => {
            errMsg('saving', 'Store');
        });

    const rlUserStoreModel = new rlUserStore({ userID: store.userID, storeID: storeModel.id });
    await rlUserStoreModel.save()
        .catch((err) => {
            errMsg('saving', 'rlUserStore');
        });
    return storeModel;
}

module.exports = {
    saveStore,
    findStore,
    editStore,
    deleteStore,
};