const mongoose = require('mongoose');
const { Schema } = mongoose;

const coordinatesSchema = new Schema({
    latitude: { type: Number },
    longtitude: { type: Number }
});

const Coordinates = mongoose.model('coordinate', coordinatesSchema);

module.exports = {
    model: Coordinates,
    schema: coordinatesSchema
}; 