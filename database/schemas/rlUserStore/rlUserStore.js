const mongoose = require('mongoose');
const { Schema } = mongoose;

const rlUserStoreschema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    storeID: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "store",
    }]
});

const rlUserStore = mongoose.model('rlUserStore', rlUserStoreschema);

module.exports = rlUserStore;