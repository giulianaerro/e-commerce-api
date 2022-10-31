import mercadopago from "mercadopago";
import { Order } from "models/order";
import { Users } from "models/users";
import { paymentConfirmationEmail, sendEmail } from "./sendgrid";

mercadopago.configure({
  access_token: process.env.MP_TOKEN,
});
export async function merchantOrder(id) {
  const merchantOrder = await getMerchantOrder(id);
  if (merchantOrder.order_status == "paid") {
    const orderId = merchantOrder.external_reference;

    const order = await new Order(orderId);
    await order.pull();
    order.data.status = "closed";
    await order.push();

    const orderById = await Order.getOrderById(orderId);
    const user = await Users.getUserDataById(orderById.userId);

    const paymentConfirmation = paymentConfirmationEmail();
    const emailSent = await sendEmail(
      user.data.email,
      "Confirmación de compra",
      paymentConfirmation
    );
    return { emailSent };
  }
}
export async function getMerchantOrder(id) {
  const res = await mercadopago.merchant_orders.get(id);
  return res.body;
}

export async function createPreference(data = {}) {
  const res = await mercadopago.preferences.create(data);
  return res.body;
}
