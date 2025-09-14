const router = require('express').Router();
const menuController = require('../controllers/menuController');
const auth = require('../middleware/auth');

router.get('/', menuController.list);
router.get('/:id', menuController.get);

// Admin routes
router.post('/', auth(true), menuController.create);
router.put('/:id', auth(true), menuController.update);
router.delete('/:id', auth(true), menuController.remove);

module.exports = router;
