const express = require('../server').express
const userRoutes = require('./user/user');
const dealsRoutes = require('./deals/deals');
const storesRoutes = require('./stores/stores');
const router = express.Router();

router.use('/user', userRoutes);
router.use('/deals', dealsRoutes);
router.use('/stores', storesRoutes);

module.exports = router;
