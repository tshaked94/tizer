const mongoose = require('mongoose');
const { Schema } = mongoose;

const dealSchema = new Schema({
        originalPrice: { type: Number },
        categories: { type: [String] },
        reducedPrice: { type: Number },
        name: { type: String },
        expiration_date: {type: String},
        store: {        
            type: Schema.Types.ObjectId,
            required: true,
            ref: "store",
        },
        photos: {
            type: [String],
            default: []
        },
        adate: {type: Number},
        edate: {
            type: Number,
            default: null
        }
});

const Deal = mongoose.model('deal', dealSchema);

module.exports = Deal