const userStoreModel = require('../../../database/schemas/rlUserStore/rlUserStore');
async function getUserStores(userId) {
// get user related stores (join user to rl to store)
    res = await userStoreModel.find({userID: userId})
    .populate('userID')
    .populate('storeID');
    return res;
}

module.exports = {
    getUserStores: getUserStores
}