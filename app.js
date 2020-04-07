const express = require('express')
const bodyParser = require("body-parser");
const axios = require('axios'); // for third party http requests
// const router = express.Router;
// const authRoutes = require('./api/auth-routes');
// const profileRoutes = require('./api/profile-routes');
// const passportSetup = require('./engine/config/passport-setup');
// const mongoose = require('mongoose');
// const keys = require('./engine/config/keys');
// const cookieSession = require('cookie-session');
// const passport = require('passport');

const app = express();
var token;

app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.use(bodyParser.json());

var PORT = process.env.PORT || 5000;
//set up view engine
app.set('view engine', 'ejs');

// app.use(cookieSession({
//     maxAge: 24 * 60 * 60 * 1000, // 1 day
//     keys: [keys.session.cookieKey]
// }));

//initialize passport
// app.use(passport.initialize());
// app.use(passport.session());

//connect to mongodb
// mongoose.connect(keys.mongodb.dbURI, () => {
//     console.log('Connected to MongoDB');
// });

//set up routes
// app.use('/auth', authRoutes);
// app.use('/user', profileRoutes);

//create home route
app.get('/', (req, res) => {
    res.send('hello');
    console.log('hello');
    // res.render('home');
});

// app.post('/user/setAccessToken', (req, res) => {
//     res.send('welcome to set access token');
//     token = req.body.activeToken;
//     res.send('access token recieved: ' + token);
// })

app.post('/user/getName', (req, res) => {

    res.send('welcome to set access token');
    token = req.body.activeToken;
    res.send('access token recieved: ' + token);

    axios({
        method: "GET",
        url: `https://graph.facebook.com/me?access_token=${token}&fields=name`
    }).then((response) => {
        res.send(response);
    });
});

app.listen(PORT, () => {
    console.log('Now listening on port ' + PORT);
});

module.exports.app = app;