const Router = require('../framework/server/Router');
const controller = require('../controllers/cost-controller');
const router = new Router();

router.get('/costs', controller.get);
router.post('/costs', controller.create);
router.put('/costs', controller.update);
router.delete('/costs', controller.del);

module.exports = router;