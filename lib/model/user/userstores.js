const db = require('../../../database/dbController');
const { addStoreToUserStore } = require('../../../database/user/userstores');
const { evaluateCoordinatesFromAddress } = require('../utils/location');
const { latitude } = require('is-valid-coordinates');

//return all the stores of the user that has id of userID
const getUserStores = async (userId) => {
    return db.getUserStores(userId);
}

const addReview = async (review) => {
    const reviewAdded = await db.saveReview(review);
    const obj = await db.findStoreReviewObj({ storeID: review.storeID })
    console.log(obj);
    obj.length > 0 ?
        db.addReviewToStore(review.storeID, reviewAdded._id) :
        db.addFirstReview(review.storeID, reviewAdded._id);
    return 'Review Added Successfully';
}

const addStore = async (store) => {
    var result;
    const { userID, storeObject } = store;

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
    const storeModel = await db.saveStore(store.storeObject);
    console.log(storeModel);

    const { id: storeID } = storeModel;

    (await db.findUserStoreObj({ userID: userID })).length > 0 ?
        db.addStoreToUserStore(userID, storeID) :
        db.saveNewUserStore(userID, storeID);
}

module.exports = {
    getUserStores,
    addStore,
    addReview
}