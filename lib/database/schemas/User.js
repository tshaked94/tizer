const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pictureSchema = require('./Picture').schema;

const userSchema = new Schema({
    id: { type: String },
    token: { type: String },
    tokenExpiredDate: {type: Number},
    email: { type: String },
    name: { type: String },
    link: {type: String},
    birthday: {type: String},
    picture: { type: pictureSchema}
});

const User = mongoose.model('user', userSchema);

module.exports = User;