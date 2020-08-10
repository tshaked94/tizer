const mongoose = require('mongoose');
const { Schema } = mongoose;

const dealSchema = new Schema({
        originalPrice: { type: Number },
        categories: { type: [String] },
        reducedPrice: { type: Number },
        name: { type: String },
});

const Deal = mongoose.model('deal', dealSchema);

module.exports = {
    model: Deal,
    schema: dealSchema
}; 