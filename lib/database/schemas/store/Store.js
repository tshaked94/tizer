const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const locationSchema = require('./location/Location').schema;
const dealSchema = require('./Deal').schema;

const storeSchema = new Schema({
    location: {type: locationSchema},
    deals: {type: [dealSchema]},
    name: {type: String},
    categories: {type: Array},
    phoneNumber: {type: String}    
});