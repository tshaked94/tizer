const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    facebook:{
        id: String,
        token: String,
        email: String,
        name: String
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;