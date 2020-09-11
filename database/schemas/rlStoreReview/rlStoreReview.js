const mongoose = require('mongoose');
const { Schema } = mongoose;

const rlStoreReviewSchema = new Schema({
    storeID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "store"
    },
    reviewID: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "review",
    }]
}, {timestamps: true});

const rlStoreReview = mongoose.model('rlStoreReview', rlStoreReviewSchema);

module.exports = rlStoreReview;