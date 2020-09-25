const dealsModel = require('../schemas/deal/Deal');
const { storeModel } = require('../schemas/store/Store');

const dbUploadPhoto = async (id, imgObj, object) => {
    switch (object) {
        case "tizer":
            await storeModel.updateOne({ _id: id },
                { $push: { tizers: imgObj } }).exec();
            break;
        case "deal":
            await dealsModel.updateOne({ _id: id },
                { $push: { photos: imgObj } }).exec();
            break;
        case "store":
            await storeModel.updateOne({ _id: id },
                { $push: { photos: imgObj } }).exec();
            break;
        default:
            throw new Error("Invalid object for photo: " + object);
    }
}

module.exports = {
    dbUploadPhoto
}