const app = require('./server').app
const bodyParser = require("body-parser");
const api = require('./api/api');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/', (req,res) => {
    res.send('hi');
});

app.use('/api', api);

module.exports = app