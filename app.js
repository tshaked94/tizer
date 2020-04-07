const express = require('express')
// const authRoutes = require('./api/auth-routes');
// const profileRoutes = require('./api/profile-routes');
// const passportSetup = require('./engine/config/passport-setup');
// const mongoose = require('mongoose');
// const keys = require('./engine/config/keys');
// const cookieSession = require('cookie-session');
// const passport = require('passport');

const app = express();

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
// app.use('/profile', profileRoutes);

//create home route
app.get('/', (req, res) => {
    console.log('hello');
    // res.render('home');
});

app.listen(3000, () => {
    console.log('Now listening on port 3000');
})

module.exports.app = app;