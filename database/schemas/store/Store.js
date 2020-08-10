const mongoose = require('mongoose');
const { Schema } = mongoose;

const { schema: locationSchema } = require('../location/Location');
const { schema: dealSchema } = require('../Deal');

const storeSchema = new Schema({
    location: { type: locationSchema },
    deals: { type: [dealSchema] },
    name: { type: String },
    categories: { type: [String] },
    phoneNumber: { type: String },
    isKosher: { type: Boolean },
    workingHours: {
        type: {
            type: Number,
            type: Number,
        }
    }
});

const Store = mongoose.model('store', storeSchema);

module.exports = Store;