const Router = require('../framework/server/Router');
const controller = require('../controllers/category-controlller');
const router = new Router();

router.get('/categories', controller.get);
router.post('/categories', controller.create);
router.put('/categories', controller.update);
router.delete('/categories', controller.del);

module.exports = router;