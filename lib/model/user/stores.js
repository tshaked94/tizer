const userStoreModel = require('../../../database/schemas/rlUserStore/rlUserStore');
const userModel = require('../../../database/schemas/user/User');
const getUserStores = async (userId) => {
    // get user related stores (join user to rl to store)
    res = await userStoreModel.find({ userID: userId })
        .populate('userID')
        .populate('storeID');
    return res;
}

module.exports = {
    getUserStores
}