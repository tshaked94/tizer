const { getUserStores: getUserStoresFromDB, saveStore,
    addStoreToUserStore: addStoreToUserStoreInDB, saveReview, findStoreReviewObj, findStoreRlReviews, addReviewToStore, findUser, findStore } = require('../../../database/dbController');
const { addStoreToUserStore } = require('../../../database/user/userstores');
const { evaluateCoordinatesFromAddress } = require('../utils/location');
const { validateStore } = require('../store/store');
const { validateObject } = require('../utils/validateUtils');
const { formatDate } = require('../utils/date');


//return all the stores of the user that has id of userID
const getUserStores = async (userId) => {
    validateObject(await findUser({ _id: userId }),
        'id is invalid, doesn\'t compatible for any userID');

    userStores = await getUserStoresFromDB(userId);
    if (typeof userStores !== 'undefined' && userStores.length > 0) {
        userStores = userStores.toObject()
        userStores.forEach((val, index) => {
            valObj = val.toObject();
            if(typeof valObj.updatedAt !== 'undefined') {
                valObj.updatedAt = formatDate(valObj.updatedAt);
            }
            if(typeof valObj.createdAt !== 'undefined') {
                valObj.createdAt = formatDate(valObj.createdAt);
            }
            userStores[index] = valObj;
        });
    }
    return userStores;
}

const addReview = async (review) => {
    const { storeID, userID } = review;
    console.log(userID);
    console.log(storeID);

    validateObject(await findUser({ _id: userID }),
        'id is invalid, doesn\'t compatible for any userID');

    validateObject(await findStore({ _id: storeID }),
        'id is invalid doesn\'t compatible to any store ');

    const reviewAdded = await saveReview(review);
    await addReviewToStore(storeID, reviewAdded._id);
    return 'Review Added Successfully';
}

const getStoreReviews = async (storeID) => {
    validateObject(await findStore({ _id: storeID }),
        'id is invalid doesn\'t compatible to any store ');

    var res = await findStoreRlReviews({ storeID: storeID });
    if(typeof res !== 'undefined' && res.length > 0) {
        res = res.toObject();
        res.forEach((val, index) => {
            valObj = val.toObject();
            if(typeof valObj.updatedAt !== 'undefined') {
                valObj.updatedAt = formatDate(valObj.updatedAt);
            }
            if(typeof valObj.createdAt !== 'undefined') {
                valObj.createdAt = formatDate(valObj.createdAt);
            }
            if(typeof valObj.userID !== 'undefined') {
                if(typeof valObj.userID.createdAt !== 'undefined') {
                    valObj.userID.createdAt = formatDate(valObj.userID.createdAt);
                }
                if(typeof valObj.userID.updatedAt !== 'undefined') {
                    valObj.userID.updatedAt = formatDate(valObj.userID.updatedAt);
                }
            }
            res[index] = valObj;
        });
    }
    return res;
}

const addStore = async (store) => {
    var result;
    const { userID, storeObject } = store;
    console.log(userID);

    validateObject(await findUser({ _id: userID }),
        'id is invalid, doesn\'t compatble for any userID');
    validateStore(storeObject);

    try {
        result = await evaluateCoordinatesFromAddress(storeObject.location)
    }
    catch{
        console.log('in catch when trying forward gedcooding address');
        throw new Error('There was error in forward geocoding');
    }
    const { latitude, longtitude } = result;

    console.log('latitude is: ' + latitude);
    console.log('longtitude is: ' + longtitude);

    // assign coordinates
    storeObject.location.coordinates = {
        latitude: latitude,
        longtitude: longtitude
    };
    if(storeObject.images !== 'undefined' && storeObject.images != null &&  Array.isArray(storeObject.images) && storeObject.images.length > 0) {
        storeObject.photos = await uploadBulkPhoto(storeObject.images, userID, 'store');
        delete storeObject.images;
    }
    //assign in db
    const storeModel = await saveStore(store.storeObject);
    console.log(storeModel);
    const { id: storeID } = storeModel;
    // await addStoreToUserStoreInDB(userID, storeID);
    return "Store added successfully";
}

module.exports = {
    getUserStores,
    addStore,
    addReview,
    getStoreReviews
}