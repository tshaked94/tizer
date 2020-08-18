const mongoose = require('mongoose');
const { Schema } = mongoose;

const openingHoursSchema = new Schema({
    openingTime: { type: String },
    closingTime: { type: String },
});

const opnenigHours = mongoose.model('openingHours', openingHoursSchema);

module.exports = {
    model: opnenigHours,
    schema: openingHoursSchema
}; 