const { express } = require('../server');
const userRoutes = require('./user/user');
const dealsRoutes = require('./deals/deals');
const storesRoutes = require('./stores/stores');
const reviewRoutes = require('./reviews/reviews');
const uploadRoutes = require('./upload/upload');
const router = express.Router();

router.use('/upload', uploadRoutes);
router.use('/user', userRoutes);
router.use('/deals', dealsRoutes);
router.use('/stores', storesRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;
