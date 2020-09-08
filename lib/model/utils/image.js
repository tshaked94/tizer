const { dbUploadPhoto } = require('../../../database/dbController');
const imgur = require('imgur');
const { errMsg } = require('../../../database/utils/constants');

const uploadPhoto = async (id, image, object) => {
        if(!id) {
            return res.send('ID not set');
        }
        try {
            const json = await imgur.uploadBase64(image);
            await dbUploadPhoto(id, json.data.link, object);
            return json.data.link

        } catch ($e) {
            throw new Error(errMsg('upload', 'error in uploading photo'));
        }
        
}

module.exports = {
     uploadPhoto
};