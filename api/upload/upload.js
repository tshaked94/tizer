const { express } = require('../../server');
const router = express.Router();
const dealsRoutes = require('./deals/dealsUpload');
const storesRoutes = require('./stores/storesUpload');

router.use('/stores', storesRoutes);
router.use('/deals', dealsRoutes);

module.exports = router;