const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coordinatesSchema = new Schema({
    latitude: { type: Number },
    longtitude: { type: Number }
});

const Coordinates = mongoose.model('deal', coordinatesSchema);

module.exports = {
    model: Coordinates,
    schema: coordinatesSchema
}; 