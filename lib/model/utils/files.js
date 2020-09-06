const { multer, path } = require('../../../server');
const fs = require('fs');
const moveFile = async function move(oldPath, newPath, callback) {
    var pathArr = newPath.split('\\');
    pathArr.pop();
    var pathTomkdir = pathArr.join('\\');
    fs.mkdirSync(process.cwd() + pathTomkdir, { recursive: true }, (err) => {
        if (err) {
            throw err;
        }
        console.log('dir made');
    })
    fs.rename(oldPath, process.cwd() + newPath, function (err) {
        if (err) {
            if (err.code === 'EXDEV') {
                copy();
            } else {
                callback(err);
            }
            return;
        }
        callback();
    });

    function copy() {
        var readStream = fs.createReadStream(oldPath);
        var writeStream = fs.createWriteStream(newPath);

        readStream.on('error', callback);
        writeStream.on('error', callback);

        readStream.on('close', function () {
            fs.unlink(oldPath, callback);
        });

        readStream.pipe(writeStream);
    }
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
module.exports = {
    fs,
    moveFile,
    storage
};