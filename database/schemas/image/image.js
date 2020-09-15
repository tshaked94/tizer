const mongoose = require('mongoose');
const { Schema } = mongoose;

const imageSchema = new Schema({
    link: { type: String },
    userID: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    message: {type: String}
}, {timestamps: true});

const Image = mongoose.model('image', imageSchema);

module.exports = {
    Image: Image,
    imageSchema: imageSchema
}