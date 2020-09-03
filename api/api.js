const { express } = require('../server');
const userRoutes = require('./user/user');
const dealsRoutes = require('./deals/deals');
const storesRoutes = require('./stores/stores');
const reviewRoutes = require('./reviews/reviews');
const router = express.Router();

router.use('/user', userRoutes);
router.use('/deals', dealsRoutes);
router.use('/stores', storesRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;
