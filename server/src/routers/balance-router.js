const Router = require('../framework/server/Router');
const controller = require('../controllers/balance-controller');
const router = new Router();

router.get('/balance', controller.getValue);
router.get('/balance/history', controller.getHistory);
router.post('/balance', controller.replenish);

module.exports = router;