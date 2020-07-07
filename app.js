const app = require('./server').app
const express = require('express');
const bodyParser = require("body-parser");
const api = require('./api/api');

app.use(express.json({ extended: false }));
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log('in origin url');
    res.send('hi you');
});



app.use('/api', api);

module.exports = app