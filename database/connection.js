const mongoose = require('mongoose');
const keys = require('./keys');

const connectDB = async () => {
    // mongoose.set('useFindAndModify', false);
    await mongoose.connect(keys.mongodb.dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(
        () => {
            console.info(``);
        },
        error => {
            console.error(`Connection error: ${error.stack}`)
            process.exit(1)
        }
    )
}

module.exports.connection = mongoose.connection;
module.exports.connectDB = connectDB;