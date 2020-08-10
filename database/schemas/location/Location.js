const mongoose = require('mongoose');
const { Schema } = mongoose;

const { schema } = require('./Coordinates');

const locationSchema = new Schema({
    coordinates: { type: schema },
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