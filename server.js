const express = require('express')
const app = express();
var PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('listens on port ' + PORT);
});

module.exports = {
    app: app,
    express: express
};