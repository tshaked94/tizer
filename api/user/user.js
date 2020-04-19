const express = require('../../server').express;
const router = express.Router();
const loginRoutes = require('./login/login');

router.use('/login', loginRoutes);

module.exports = router;