const userStoreModel = require('../schemas/rlUserStore/rlUserStore');
const { errMsg } = require('../utils/constants');


const getUserStores = async (userId) => {
    // get user related stores (join user to rl to store)
    const res = await userStoreModel
        .find({ userID: userId })
        .populate('storeID')
        .catch((err) => {
            throw new Error(errMsg('finding', 'userStores') + err.message);
        });

    if (res.length > 0) {
        return res[0].storeID;
    }
    return res;
}


const addStoreToUserStore = async (userID, storeIDToPush) => {
    console.log('in adding to existing object ------------ >');
    console.log(storeIDToPush);
    userStoreModel
        .updateOne({ userID: userID },
            { $push: { storeID: storeIDToPush } }, { upsert: true })
        .exec()
        .catch((err) => {
            throw new Error(errMsg('update', 'userStore') + err.message);
        });
}


// const findUserStoreObj = async (filter) => {
//     return userStoreModel.find(filter)
//         .exec()
//         .catch(() => {
//             throw new Error(errMsg('finding', 'rlUserStore'));
//         });

// }

module.exports = {
    getUserStores,
    addStoreToUserStore,
}