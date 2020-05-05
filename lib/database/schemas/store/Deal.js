const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const dealSchema = new Schema({
    originalPrice: {type: Number},
    reducedPrice: {type: Number},
    name: {type: String},
});

const Deal = mongoose.model('deal', dealSchema);

module.exports = {
    model: Deal,
    schema: dealSchema
}; 