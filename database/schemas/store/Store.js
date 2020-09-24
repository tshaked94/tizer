const mongoose = require('mongoose');
const { Schema } = mongoose;
const { imageSchema } = require('../image/image');
const { schema: locationSchema } = require('../location/Location');
const { schema: openingHoursSchema } = require('../store/openingHours')
const { model: chatModel } = require('../chat/Chat');
const dealsModel = require('../deal/Deal');
// const { deleteChat } = require('../../chat/chat');
// const { deleteArrayofDeals } = require('../../deal/deal');

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

storeSchema.post('deleteOne', { document: true }, async (next) => {
    console.log('in psot hook of deleteOne');
    console.log('deals are: ===>');
    console.log(next.deals);

    console.log('now deleteing deals');
    deleteArrayofDeals(next.deals);

    const { chat: { _id: id } } = next;
    console.log('chat id is:');
    console.log(id);
    deleteChat({ _id: id });

    console.log('at the end of post hook deleteOne storeSchema');
});

const storeModel = mongoose.model('store', storeSchema);

module.exports = {
    storeModel,
    storeSchema
};


const deleteArrayofDeals = (deals) => {
    deals.forEach((deal) => {
        console.log('in deal: ==> ' + deal.name);
        deleteDeal(deal._id);
    });
}

const deleteChat = async (filter) => {
    await chatModel.deleteOne(filter).exec();
}

const deleteDeal = (id) => {
    deleteDealFromDealSchema({ _id: id });
    console.log('deal deleted from schemas deal');

    deleteDealFromStoreSchema({ deals: id });

    console.log('deal deleted from store object');
}

const deleteDealFromStoreSchema = (filter) => {
    storeModel.updateMany(filter,
        { $pull: filter },
        { multi: true })
        .exec()
        .catch(() => {
            throw new Error(errMsg('delete', 'deals Array in store schema'));
        });
}

const deleteDealFromDealSchema = (filter) => {
    dealsModel.deleteMany(filter)
        .exec()
        .catch(() => {
            throw new Error(errMsg('delete', 'deals'));
        });
}
