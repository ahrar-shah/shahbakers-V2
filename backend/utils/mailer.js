const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

async function sendOrderEmail(order, user) {
  const itemsHtml = order.items.map(i => `<li>${i.quantity} x ${i.price} (id:${i.menuItem})</li>`).join('');
  const html = `
    <h2>New Order #${order._id}</h2>
    <p>User: ${user.name} - ${user.email}</p>
    <p>Phone: ${order.phone}</p>
    <p>Address: ${order.address}</p>
    <p>Total: ${order.total}</p>
    <ul>${itemsHtml}</ul>
  `;
  const info = await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: process.env.ADMIN_EMAIL,
    subject: `New Order ${order._id}`,
    html
  });
  return info;
}

module.exports = { sendOrderEmail };
