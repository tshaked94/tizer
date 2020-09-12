const Store = require('../schemas/store/Store');
const rlUserStore = require('../schemas/rlUserStore/rlUserStore');
const Review = require('../schemas/reviews/reviews');
const rlStoreReview = require('../schemas/rlStoreReview/rlStoreReview');
const { errMsg } = require('../utils/constants');
// const rlUserStoreModel = require('../user/userstores');
// const { evaluateCoordinatesFromAddress } = require('../../lib/model/utils/location');

const findStore = (filter) => {
    var filterObj = {};

    Object.assign(filterObj, filter);
    Object.keys(filterObj).forEach(key =>
        filterObj[key] === undefined && delete filterObj[key]);
    // console.log(filter);
    const foundStore = Store.find(filterObj)
        .populate('deals').exec()
        .catch(() => {
            (errMsg('finding', 'Store'));
        });

    return foundStore;
}

const deleteStore = async (id) => {
    const idObj = { _id: id };

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
    const { location } = store;

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
        .populate({
            path: 'reviewID',
            populate: {
                path: 'userID'
            }
        });

    if (res === undefined || res.length == 0) {
        return [];
    }
    return res[0].reviewID;
}

const addReviewToStore = async (storeID, reviewIDToPush) => {
    const res = await rlStoreReview.updateOne({ storeID: storeID },
        { $push: { reviewID: reviewIDToPush } }, { "upsert": true }).exec();
    return res;
}

const deleteTizer = async (tizerID, storeID) => {
    updated = await Store.updateMany({ _id: storeID },
        { $pull: { tizers: {_id: tizerID} } },
        { multi: true })
        .exec()
        .catch(() => {
            throw new Error(errMsg('delete', 'tizers Array in store schema'));
        });
    return 'Tizer deleted succesfully';
};

module.exports = {
    saveStore,
    findStore,
    editStore,
    deleteStore,
    addReviewToStore,
    findStoreReviewObj,
    findStoreRlReviews,
    saveReview,
    deleteTizer
};