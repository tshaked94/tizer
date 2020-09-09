const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pictureSchema = require('./Picture').schema;

const userSchema = new Schema({
    facebookID: {
        type: String,
        unique: true,
        required: true 
    },
    tizerToken: {
        type: String,
        unique: true,
        required: true,
    },
    tokenExpiredDate: {type: Number},
    email: { type: String },
    name: { type: String, required: true },
    link: {type: String},
    birthday: {type: String},
    picture: { type: pictureSchema},
}, {timestamps: true});

const User = mongoose.model('user', userSchema);

module.exports = User;