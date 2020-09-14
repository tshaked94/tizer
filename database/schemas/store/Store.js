const mongoose = require('mongoose');
const { Schema } = mongoose;
const { imageSchema } = require('../image/image');
const { schema: locationSchema } = require('../location/Location');
const { schema: openingHoursSchema } = require('../store/openingHours')
const { model: chatModel } = require('../chat/Chat');

const initChat = () => {
    const newChat = new chatModel();
    newChat.save();
    return newChat._id;
}

const storeSchema = new Schema({
    location: { type: locationSchema },
    name: { type: String },
    categories: { type: [String] },
    phoneNumber: { type: String },
    isKosher: { type: Boolean },
    openingHours: { type: [openingHoursSchema] },
    deals: [{
        type: Schema.Types.ObjectId,
        ref: "deal",
    }],
    tizers: [{
        type: imageSchema,
        default: [],
    }, { timestamps: true }],
    photos: [{
        type: imageSchema,
        default: [],
    }, { timestamps: true }],
    chat: {
        type: Schema.Types.ObjectId,
        ref: "chat",
        default: initChat
    },
}, { timestamps: true });

const Store = mongoose.model('store', storeSchema);



module.exports = Store;