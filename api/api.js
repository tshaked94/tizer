const express = require('../server').express
const userRoutes = require('./user/user');
const router = express.Router();

router.use('/user', userRoutes);

module.exports = router;
