const express = require('express')
const dbController = require('./database/dbController');
const { connection } = dbController;
const app = express();

dbController.connectDB();

connection.once('open', function () {
    console.log('Connected to MongoDB');
    launchServer();
});

const launchServer = () => {
    var PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log('listens on port ' + PORT);
    });
};

module.exports = {
    app,
    express
};