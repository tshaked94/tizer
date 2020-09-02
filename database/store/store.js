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
            errMsg('finding', 'Store');
        });

    return foundStore;
}

const deleteStore = async (id) => {
    deleted = await Store.deleteOne({ _id: id });
    return deleted;
}

const editStore = async (id, store) => {
    updatedStore = await Store.updateOne({ _id: id }, store);
    return updatedStore;
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
    const reviewObj = new Review({rate: review.rate, comment: review.comment});
    reviewAdded = await reviewObj.save()
                    .catch((err) => {
                        errMsg('saving', 'Review');
                    });
     return reviewAdded;
}

const findStoreReviewObj = async (filter) => {
    return rlStoreReview.find(filter).exec();
}

const findStoreRlReviews = async(filter) => {
    const res = await rlStoreReview.find(filter)
    .populate('reviewID');
    return res[0].storeID;
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