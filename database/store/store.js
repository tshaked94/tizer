const Store = require('../schemas/store/Store');
const rlUserStore = require('../schemas/rlUserStore/rlUserStore');
const Review = require('../schemas/reviews/reviews');
const rlStoreReview = require('../schemas/rlStoreReview/rlStoreReview');
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
    updatedStore = await Store.updateOne({ _id: id }, store);
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

const addFirstReview = async (storeID, reviewID) => {

    const rlStoreReviewModel = new rlStoreReview({ storeID: storeID, reviewID: reviewID });
    await rlStoreReviewModel.save()
        .catch((err) => {
            errMsg('saving', 'rlStoreReview');
        });
    return reviewAdded;
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
    console.log(reviewIDToPush);
    rlStoreReview.updateOne({ storeID: storeID },
        { $push: { reviewID: reviewIDToPush } }).exec();
}

module.exports = {
    saveStore,
    findStore,
    editStore,
    deleteStore,
    addFirstReview,
    addReviewToStore,
    findStoreReviewObj,
    findStoreRlReviews,
    saveReview
};