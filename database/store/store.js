const { storeModel, storeSchema } = require('../schemas/store/Store');
const rlUserStore = require('../schemas/rlUserStore/rlUserStore');
const Review = require('../schemas/reviews/reviews');
const rlStoreReview = require('../schemas/rlStoreReview/rlStoreReview');
const { errMsg } = require('../utils/constants');
// const { deleteChat } = require('../chat/chat');
// const { deleteArrayofDeals } = require('../deal/deal');

const findStore = async (filter) => {
    var filterObj = {};

    Object.assign(filterObj, filter);
    Object.keys(filterObj).forEach(key =>
        filterObj[key] === undefined && delete filterObj[key]);
    // console.log(filter);
    const foundStore = await storeModel.find(filterObj)
        .populate('deals').exec()
        .catch(() => {
            (errMsg('finding', 'Store'));
        });

    return foundStore;
}

const deleteStore = async (id) => {
    const idObj = { _id: id };

    await deleteStoreFromStoreSchema(idObj);
    console.log('store with id of: ' + id + ' was deleted');

    rlUserStore.updateMany({ storeID: id },
        { $pull: { storeID: id } },
        { multi: true })
        .exec()
        .catch(() => {
            throw new Error(errMsg('rlUserStore', 'store Array in store schema'));
        });

    console.log('storeID was deleted from rlUserStore Schema');

    return 'store deleted successfully!';
}

const editStore = async (id, store) => {
    const { location } = store;

    const updatedStore = await storeModel.findOneAndUpdate({ _id: id },
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

const deleteStoreFromStoreSchema = async (filter) => {

    const storeToDelete = await findStore(filter);

    await storeToDelete[0].deleteOne();
}

const saveStore = async (store) => {
    const newStore = new storeModel(store);

    await newStore.save()
        .catch((err) => {
            errMsg('saving', 'Store');
            console.log(err.message);
        });

    return newStore;
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
    updated = await storeModel.updateMany({ _id: storeID },
        { $pull: { tizers: { _id: tizerID } } },
        { multi: true })
        .exec()
        .catch(() => {
            throw new Error(errMsg('delete', 'tizers Array in store schema'));
        });
    return 'Tizer deleted succesfully';
};

const getTizers = async (filter) => {
    return await storeModel.find(filter).select('tizers -_id')
        .populate('tizers.userID');
}

module.exports = {
    getTizers,
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