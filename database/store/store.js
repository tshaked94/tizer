const Store = require('../schemas/store/Store');
const rlUserStore = require('../schemas/rlUserStore/rlUserStore');
const { errMsg } = require('../utils/constants');
const rlUserStoreModel = require('../user/userstores');

const findStore = (filter) => {
    var filterObj = {};

    Object.assign(filterObj, filter);
    Object.keys(filterObj).forEach(key =>
        filterObj[key] === undefined && delete filterObj[key]);

    const foundStore = Store.find(filterObj)
        .populate('deals')
        .catch(() => {
            errMsg('finding', 'Store');
        });

    return foundStore;
}

const deleteStore = async (id) => {
    deleted = await Store.deleteOne({ _id: id });
    return deleted
}

const editStore = async (id, store) => {
    updatedStore = await Store.updateOne({ _id: id }, store);
    return updatedStore;
}

const saveStore = async (store) => {
    const storeModel = new Store(store);

    await storeModel.save()
        .catch((err) => {
            errMsg('saving', 'Store');
            console.log(err.message);
        });

    return storeModel;
}

module.exports = {
    saveStore,
    findStore,
    editStore,
    deleteStore,
};