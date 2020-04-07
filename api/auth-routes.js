const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req,res) => {
    //render login page
});

//auth logout
router.get('/logout', (req, res) => {
    //handle with passport - done
    req.logout();
    res.redirect('/');
});

//auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

//callback route for google to redirect to
router.get('/google/redirect', (req, res) => {
    res.redirect('/profile/');
});

router.get('/facebook', passport.authenticate('facebook', {
    scope: ['profile']
}));

router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/'
}));

module.exports = router;