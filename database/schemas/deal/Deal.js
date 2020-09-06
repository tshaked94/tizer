const mongoose = require('mongoose');
const { schema: openingHoursSchema } = require('../store/openingHours');
const { Schema } = mongoose;

const dealSchema = new Schema({
    originalPrice: { type: Number },
    categories: { type: [String] },
    reducedPrice: { type: Number },
    name: { type: String },
    expiration_date: { type: [openingHoursSchema] },
    store: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "store",
    },
    photos: {
        type: [String],
        default: []
    },
}, {timestamps: true});

const Deal = mongoose.model('deal', dealSchema);

module.exports = Deal