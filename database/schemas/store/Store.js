const mongoose = require('mongoose');
const { Schema } = mongoose;

const { schema: locationSchema } = require('../location/Location');

const storeSchema = new Schema({
    location: { type: locationSchema },
    name: { type: String },
    categories: { type: [String] },
    phoneNumber: { type: String },
    isKosher: { type: Boolean },
    workingHours: {
        type: {
            type: Number,
            type: Number,
        }
    },
    deals: [{
        type: Schema.Types.ObjectId,
        ref: "deal",
    }]
});

const Store = mongoose.model('store', storeSchema);

module.exports = Store;