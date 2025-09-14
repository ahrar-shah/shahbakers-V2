const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const { sendOrderEmail } = require('../utils/mailer');

exports.createOrder = async (req, res, next) => {
  try {
    const { items, address, phone } = req.body;
    if (!items || items.length === 0) return res.status(400).json({ message: 'Cart empty' });

    // Build items with price snapshot
    const populated = await Promise.all(items.map(async i => {
      const menu = await MenuItem.findById(i.menuItem);
      if (!menu) throw new Error('Menu item not found: ' + i.menuItem);
      return { menuItem: menu._id, quantity: i.quantity || 1, price: menu.price };
    }));

    const total = populated.reduce((s, it) => s + it.price * it.quantity, 0);

    const order = await Order.create({
      user: req.user._id,
      items: populated,
      total,
      address,
      phone
    });

    // send email (fire and forget)
    try {
      await sendOrderEmail(order, req.user);
    } catch (mailErr) {
      console.error('Mail error', mailErr);
    }

    res.json(order);
  } catch (err) { next(err); }
};

exports.getOrdersForUser = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('items.menuItem');
    res.json(orders);
  } catch (err) { next(err); }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate('user').populate('items.menuItem').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) { next(err); }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(order);
  } catch (err) { next(err); }
};
