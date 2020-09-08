const { dbUploadPhoto } = require('../../../database/dbController');
const imgur = require('imgur');

const uploadPhoto = async (id, image, object) => {
        if(!id) {
            return res.send('ID not set');
        }
        base64Image = Buffer.from(image).toString('base64');
        // Display uploaded image for user validation
        const json = await imgur.uploadBase64(base64Image);
        await dbUploadPhoto(id, json.data.link, object);
        return json.data.link
}

module.exports = {
     uploadPhoto
};