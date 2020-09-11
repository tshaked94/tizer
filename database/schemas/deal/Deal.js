const mongoose = require('mongoose');
const { schema: openingHoursSchema } = require('../store/openingHours');
const { Schema } = mongoose;
const { imageSchema } = require('../image/image');

const dealSchema = new Schema({
    originalPrice: { type: Number },
    categories: { type: [String] },
    reducedPrice: { type: Number },
    name: { type: String },
    openingHours: { type: [openingHoursSchema] },
    expiration_date: { type: Number },
    store: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "store",
    },
    photos: [{
        type: imageSchema,
        default: [],
    }, {timestamps: true}],
}, {timestamps: true});

const Deal = mongoose.model('deal', dealSchema);

module.exports = Deal