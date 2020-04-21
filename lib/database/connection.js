const mongoose = require('mongoose');
const keys = require('../config/keys');

//connect to mongodb
const connectDB = async () => {
   await mongoose.connect(keys.mongodb.dbURI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, () => {
            console.log('Connected to MongoDB');
        }).catch((err) => {
            console.log("there was error while trying connect to mongoDB");
        });
};

// mongoose.connect(keys.mongodb.dbURI,
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     () => {
//         console.log('Connected to MongoDB');
//     });

module.exports.connectDB = connectDB;