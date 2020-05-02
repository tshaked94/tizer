const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const coordinatesSchema = require('./Coordinates').schema;

const locationSchema = new Schema({
    coordinates: {type: coordinatesSchema},
    country: { type: String },
    city: { type: String },
    street: { type: String },
    houseNumber: { type: Number }
});

const Location = mongoose.model('location', locationSchema);

module.exports = {
    model: Location,
    schema: locationSchema
}; 