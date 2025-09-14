const router = require('express').Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');

router.post('/', auth(false), orderController.createOrder);
router.get('/my', auth(false), orderController.getOrdersForUser);

// Admin
router.get('/', auth(true), orderController.getAllOrders);
router.put('/:id/status', auth(true), orderController.updateStatus);

module.exports = router;
