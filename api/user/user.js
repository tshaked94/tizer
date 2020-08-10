const { express } = require('../../server');
const router = express.Router();
const loginRoutes = require('./login/login');
const storeRoutes = require('./stores/stores');

router.use('/login', loginRoutes);
router.use('/stores', storeRoutes);

module.exports = router;