const dealsModel = require('../schemas/deal/Deal');
const storeModel = require('../schemas/store/Store');

const dbUploadPhoto = async (id, folder, fileName) => {
    switch(folder) {
        case "tizer":
            storeModel.updateOne({ _id: id },
                { $push: { tizers: fileName } }).exec();
            break;
        case "deal":
            dealsModel.updateOne({ _id: id },
                { $push: { photos: fileName } }).exec();
            break;
        case "store":
            storeModel.updateOne({ _id: id },
                { $push: { photos: fileName } }).exec();
            break;
    }

}

module.exports = {
    dbUploadPhoto
}