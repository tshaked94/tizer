const app = require('./server').app
const express = require('express');
const bodyParser = require("body-parser");
const api = require('./api/api');
const connector = require('./lib/database/connection');

// const mongoose = require('mongoose');
// const keys = require('./lib/config/keys');


connector.connectDB();

// mongoose.connect(keys.mongodb.dbURI,
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     () => {
//         console.log('Connected to MongoDB');
//     });

app.use(express.json({ extended: false }));
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('hi');
});



app.use('/api', api);

module.exports = app