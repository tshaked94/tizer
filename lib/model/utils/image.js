const { dbUploadPhoto } = require('../../../database/dbController');
const imgur = require('imgur');

const uploadPhoto = async (id, image, object) => {
        if(!id) {
            return res.send('ID not set');
        }
        const json = await imgur.uploadBase64(image);
        await dbUploadPhoto(id, json.data.link, object);
        return json.data.link
}

module.exports = {
     uploadPhoto
};