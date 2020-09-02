const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    rate: {type: Number},
    comment: {type: String}
});

const Review = mongoose.model('review', reviewSchema);

module.exports = Review