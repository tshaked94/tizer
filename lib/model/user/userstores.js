const { getUserStores: getUserStoresFromDB, saveStore,
    addStoreToUserStore: addStoreToUserStoreInDB, saveReview, findStoreReviewObj, findStoreRlReviews, addReviewToStore} = require('../../../database/dbController');
const { addStoreToUserStore } = require('../../../database/user/userstores');
const { evaluateCoordinatesFromAddress } = require('../utils/location');
const { validateStore } = require('../store/store');

//return all the stores of the user that has id of userID
const getUserStores = async (userId) => {
    return getUserStoresFromDB(userId);
}

const addReview = async (review) => {
    const reviewAdded = await saveReview(review);
    await addReviewToStore(review.storeID, reviewAdded._id);
    return 'Review Added Successfully';
}

const getStoreReviews = async (storeID) => {
    const res = await findStoreRlReviews({ storeID: storeID });
    return res;
}

const addStore = async (store) => {
    var result;
    const { userID, storeObject } = store;
    console.log(store.storeObject);
    // if (!validateStore(storeObject))
    //     throw new Error('there was error on store input properties!!');

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

    //assign in db
    const storeModel = await saveStore(store.storeObject);
    console.log(storeModel);
    const { id: storeID } = storeModel;
    await addStoreToUserStoreInDB(userID, storeID);
    return "Store added successfully";
}

module.exports = {
    getUserStores,
    addStore,
    addReview,
    getStoreReviews
}