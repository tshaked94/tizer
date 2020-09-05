const Store = require('../schemas/store/Store');
const rlUserStore = require('../schemas/rlUserStore/rlUserStore');
const Review = require('../schemas/reviews/reviews');
const rlStoreReview = require('../schemas/rlStoreReview/rlStoreReview');
const { errMsg } = require('../utils/constants');
const rlUserStoreModel = require('../user/userstores');
const { resolveInclude } = require('ejs');
const { evaluateCoordinatesFromAddress } = require('../../lib/model/utils/location');

const findStore = (filter) => {
    var filterObj = {};

    Object.assign(filterObj, filter);
    Object.keys(filterObj).forEach(key =>
        filterObj[key] === undefined && delete filterObj[key]);

    const foundStore = Store.find(filterObj)
        .populate('deals')
        .catch(() => {
            throw new Error(errMsg('finding', 'Store'));
        });

    return foundStore;
}

const deleteStore = async (id) => {
    const idObj = { _id: id };
    var storeToDelete;

    try {
        storeToDelete = await findStore(idObj)
    } catch{
        throw new Error("id is invalid, doesn\'t not match to any store!");
    }

    deleteStoreFromStoreSchema(idObj);
    console.log('store with id of: ' + id + ' was deleted');

    rlUserStore.updateMany({ storeID: id },
        { $pull: { storeID: id } },
        { multi: true })
        .exec()
        .catch(() => {
            throw new Error(errMsg('delete', 'deals Array in store schema'));
        });

    console.log('storeID was deleted from rlUserStore Schema');

    return 'store deleted successfully!';
}

const editStore = async (id, store) => {
    store.edate = Math.floor(Date.now() / 1000);
    const { location } = store;

    store.location.coordinates = await evaluateCoordinatesFromAddress(location);
    console.log('before updating store, store is ========>');
    console.log(store);

    const updatedStore = await Store.findOneAndUpdate({ _id: id },
        { $set: store },
        {
            useFindAndModify: false,
            returnOriginal: false
        });
    if (updatedStore === null)
        throw new Error('store id is invalid! there is no store with id ' + id + ' in db!');

    console.log('store was updated successfully!');

    return updatedStore;
}

const deleteStoreFromStoreSchema = (filter) => {
    Store.deleteOne(filter)
        .exec()
        .catch(() => {
            throw new Error(errMsg('deleting', 'store'));
        });
}

const saveStore = async (store) => {
    store.adate = Math.floor(Date.now() / 1000);
    const storeModel = new Store(store);

    await storeModel.save()
        .catch((err) => {
            errMsg('saving', 'Store');
            console.log(err.message);
        });

    return storeModel;
}

const saveReview = async (review) => {
    const reviewObj = new Review({
        rate: review.rate,
        comment: review.comment,
        userID: review.userID,
        adate: Math.floor(Date.now() / 1000)
    });
    reviewAdded = await reviewObj.save()
        .catch((err) => {
            errMsg('saving', 'Review');
        });
    return reviewAdded;
}

const findStoreReviewObj = async (filter) => {
    return rlStoreReview.find(filter).exec();
}

const findStoreRlReviews = async (filter) => {
    const res = await rlStoreReview.find(filter)
        .populate('reviewID');
    return res[0].reviewID;
}

const addReviewToStore = async (storeID, reviewIDToPush) => {
    const res = await rlStoreReview.updateOne({ storeID: storeID },
        { $push: { reviewID: reviewIDToPush } }, { "upsert": true }).exec();
    return res;
}

module.exports = {
    saveStore,
    findStore,
    editStore,
    deleteStore,
    addReviewToStore,
    findStoreReviewObj,
    findStoreRlReviews,
    saveReview
};