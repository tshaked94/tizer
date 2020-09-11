const { dbUploadPhoto, getDeal, findStore } = require('../../../database/dbController');
const imgurApi = require('imgur');
const { errMsg } = require('../../../database/utils/constants');
const { imgur } = require('../../../database/keys')
const fs = require('fs');

const uploadPhoto = async (id, image, object) => {
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
        console.log(obj);
        if(typeof obj === 'undefined' || obj == null || obj.length < 1) {
            throw new Error('Invalid ' + object + ' id');
        }
        var json = await imgurApi.uploadBase64(image)
        await dbUploadPhoto(id, json.data.link, object);
        return json.data.link;
}

module.exports = {
     uploadPhoto
};