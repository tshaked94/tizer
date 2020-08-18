const userStoreModel = require('../schemas/rlUserStore/rlUserStore');
const { resolveInclude } = require('ejs');


const getUserStores = async (userId) => {
    // get user related stores (join user to rl to store)
    return await userStoreModel.find({ userID: userId })
        .populate('userID')
        .populate('storeID');
}

const saveNewUserStore = async (userID, storeID) => {
    console.log('in saving new object ------------ >');
    const rlUserStoreModel = new userStoreModel({ userID, storeID });
    await rlUserStoreModel.save()
        .catch((err) => {
            errMsg('saving', 'rlUserStore');
        });
}

const addStoreToUserStore = async (userID, storeIDToPush) => {
    console.log('in adding to existing object ------------ >');
    console.log(storeIDToPush);
    userStoreModel.update({ userID: userID },
        { $push: { storeID: storeIDToPush } }).exec();
}


const findUserStoreObj = (filter) => {
    return userStoreModel.find(filter).exec();

}

module.exports = {
    getUserStores,
    addStoreToUserStore,
    saveNewUserStore,
    findUserStoreObj
}