const mongoose = require('mongoose');
const { Schema } = mongoose;

const { schema: locationSchema } = require('../location/Location');
const { schema: openingHoursSchema } = require('../store/openingHours')

const storeSchema = new Schema({
    location: { type: locationSchema },
    name: { type: String },
    categories: { type: [String] },
    phoneNumber: { type: String },
    isKosher: { type: Boolean },
    openingHours: { type: [openingHoursSchema] },
    deals: [{
        type: Schema.Types.ObjectId,
        ref: "deal",
    }]
});

const Store = mongoose.model('store', storeSchema);

module.exports = Store;