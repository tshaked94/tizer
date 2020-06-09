const express = require('express')
const connector = require('./lib/database/connection');
const db = connector.db;
const app = express();

connector.connectDB();
db.once('open', function(){
    console.log('Connected to MongoDB');
    launchServer();
});

var launchServer = function(){
    var PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log('listens on port ' + PORT);
    });
};

module.exports = {
    app: app,
    express: express
};