const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    rate: {type: Number},
    comment: {type: String},
    userID: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "user"
    },
    adate: {type: Number},
    edate: {
        type: Number,
        default: null
    }
});

const Review = mongoose.model('review', reviewSchema);

module.exports = Review