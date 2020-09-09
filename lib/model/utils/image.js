const { dbUploadPhoto } = require('../../../database/dbController');
const imgur = require('imgur');
const { errMsg } = require('../../../database/utils/constants');

const uploadPhoto = async (id, image, object) => {
        if(!id) {
            return res.send('ID not set');
        }
        try {
            base64Image = Buffer.from(image).toString('base64')
            const json = await imgur.uploadBase64(base64Image);
            await dbUploadPhoto(id, json.data.link, object);
            return json.data.link

        } catch ($e) {
            throw new Error(errMsg('upload', 'error in uploading photo'));
        }
        
}

module.exports = {
     uploadPhoto
};