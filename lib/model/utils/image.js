const { dbUploadPhoto, getDeal, findStore, findUser } = require('../../../database/dbController');
const imgurApi = require('imgur');
const { imgur } = require('../../../database/keys');
const { Image } = require('../../../database/schemas/image/image');
const { validateObject } = require('../../../lib/model/utils/validateUtils');
const uploadPhoto = async (id, image, userID, object, message = false) => {
    imgurApi.setClientId(imgur.client_id);
    imgurApi.setAPIUrl('https://api.imgur.com/3/');

    if (!id) {
        return res.send('ID not set');
    }

    validateObject(await findUser({ _id: userID }),
        'id is invalid doesn\'t compatible to any User');

    switch (object) { //TODO - validate given id (see if exists)
        case 'deal':
            obj = await getDeal(id);
            break;
        case 'store':
            obj = await findStore({ _id: id });
            break;
        case 'tizer':
            obj = await findStore({ _id: id });
            break;
    }
    if (typeof obj === 'undefined' || obj == null || obj.length < 1) {
        throw new Error('Invalid ' + object + ' id');
    }
    var json = await imgurApi.uploadBase64(image);
    obj = {
        link: json.data.link,
        userID: userID
    };
    if (message) {
        obj.message = message;
    }
    var img = new Image(obj);
    await dbUploadPhoto(id, img, object);
    return img;
}

const uploadBulkPhoto = async (images, userID) => {
    res = await imgurApi.uploadImages(images, 'Base64');
    res.links = [];
    res.forEach(function (imgObj) {
        img = new Image({ link: imgObj.link, userID: userID });
        res.links.push(img);
    })
    return res.links;
}

module.exports = {
    uploadPhoto,
    uploadBulkPhoto
};