const { app } = require('./server');
const express = require('express');
const bodyParser = require("body-parser");
const api = require('./api/api');

app.use(express.json({ extended: false }));

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

app.get('/', (req, res) => {
    console.log('in origin url');
    res.send('hi you');
});

app.use('/api', api);

module.exports = app