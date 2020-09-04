const { moveFile } = require('./files');
const { multer, path } = require('../../../server');
const { dbUploadPhoto } = require('../../../database/dbController');

const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
const uploadPhoto = async (id, req , res, folder) => {
    // folder is the name of our file input field in the HTML form

    const now = Math.floor(Date.now()/1000);
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'public/uploads');
        },
    
        // By default, multer removes file extensions so let's add them back
        filename: function(req, file, cb) {
            cb(null, now + path.extname(file.originalname));
        }
    });

    let upload = multer({ storage: storage, fileFilter: imageFilter }).single(folder);
    var fileName = await upload(req, res, async (err) => {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if(!id) {
            return res.send('ID not set');
        }
        else if (err instanceof multer.MulterError) {
            console.log('error3');
            return res.send(err);
        }
        else if (err) {
            console.log('error4');
            return res.send(err);
        }

        var fileName = req.file.filename;
        var newPath = null;
        switch(folder) {
            case 'tizer':
                newPath = '\\public\\stores\\' + id + '\\tizers\\' + fileName
                break;
            case 'deal':
                newPath = '\\public\\deals\\' + id + '\\photos\\' + fileName
                break;
            case 'store':
                newPath = '\\public\\stores\\' + id + '\\photos\\' + fileName
                break;
        }
        var oldPath = req.file.path;
        await moveFile(oldPath, newPath, function (err) {
            if(err) {
                throw err;
            }
        });
        // Display uploaded image for user validation
        await dbUploadPhoto(id, folder, fileName);
        res.send('Photo uploaded successfully');
    });

}

module.exports = {
     imageFilter,
     uploadPhoto
};