const mongoose = require('mongoose');
const { Schema } = mongoose;

const dealSchema = new Schema({
        originalPrice: { type: Number },
        categories: { type: [String] },
        reducedPrice: { type: Number },
        name: { type: String },
        expiration_date: {type: Number},
        store: {        
            type: Schema.Types.ObjectId,
            required: true,
            ref: "store",
        }
});

const Deal = mongoose.model('deal', dealSchema);

module.exports = Deal