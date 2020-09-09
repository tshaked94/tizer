const { dbUploadPhoto } = require('../../../database/dbController');
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
        base64Image = Buffer.from(image).toString('base64');
        var json = await imgurApi.uploadBase64(base64Image)
        await dbUploadPhoto(id, json.data.link, object);
        return json.data.link;
}

module.exports = {
     uploadPhoto
};