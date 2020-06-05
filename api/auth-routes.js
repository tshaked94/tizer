const router = require('express').Router();

// auth login
router.get('/login', (req,res) => {
    //render login page
});

router.get('/setAccessToken', (req, res) => {
    res.send('access token recieved: ' + req.activeToken);
});

//auth logout
router.get('/logout', (req, res) => {
    //handle with passport - done
    req.logout();
    res.redirect('/');
});

module.exports = router;