const mongoose = require('mongoose');
const keys = require('../config/keys');

//connect to mongodb
// const connectDB = async function () {
//     await mongoose.connect(keys.mongodb.dbURI,
//         {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         }, (err) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log('Connected to MongoDB');
//             }
//         }).catch((err) => {
//             console.log("there was error while trying connect to mongoDB");
//         });
// };

const connectDB = async () => {
    await mongoose.connect(keys.mongodb.dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
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

// mongoose.connect(keys.mongodb.dbURI,
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     () => {
//         console.log('Connected to MongoDB');
//     });

module.exports.db = mongoose.connection;
module.exports.connectDB = connectDB;