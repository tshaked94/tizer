const { dbUploadPhoto, getDeal, findStore } = require('../../../database/dbController');
const imgurApi = require('imgur');
const { errMsg } = require('../../../database/utils/constants');
const { imgur } = require('../../../database/keys');
const { Image } = require('../../../database/schemas/image/image');
const fs = require('fs');

const uploadPhoto = async (id, image, userID, object) => {
    imgurApi.setClientId(imgur.client_id);
    imgurApi.setAPIUrl('https://api.imgur.com/3/');

        if(!id) {
            return res.send('ID not set');
        }
        switch(object) { //TODO - validate given id (see if exists)
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
        if(typeof obj === 'undefined' || obj == null || obj.length < 1) {
            throw new Error('Invalid ' + object + ' id');
        }
        var json = await imgurApi.uploadBase64(image);
        var img = new Image({link: json.data.link, userID: userID});
        await dbUploadPhoto(id, img, object);
        return img;
}

const uploadBulkPhoto = async (images, userID) => {
    res = await imgurApi.uploadImages(images, 'Base64');
    res.links = [];
    res.forEach(function (imgObj) {
        img = new Image({link: imgObj.link, userID: userID});
        res.links.push(img);
    })
    return res.links;
}

module.exports = {
     uploadPhoto,
     uploadBulkPhoto
};