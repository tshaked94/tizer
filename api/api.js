const { express } = require('../server');
const userRoutes = require('./user/user');
const dealsRoutes = require('./deals/deals');
const storesRoutes = require('./stores/stores');
const reviewRoutes = require('./reviews/reviews');
const locationRoutes = require('./location/location');
const uploadRoutes = require('./upload/upload');
const chatRoutes = require('./chat/chat');

const router = express.Router();

router.use('/upload', uploadRoutes);
router.use('/user', userRoutes);
router.use('/deals', dealsRoutes);
router.use('/stores', storesRoutes);
router.use('/reviews', reviewRoutes);
router.use('/chat', chatRoutes);
router.use('/location', locationRoutes);

module.exports = router;
