import { getMerchantOrder, merchantOrder } from "lib/mercadopago";
import type { NextApiRequest, NextApiResponse } from "next";
import { Order } from "models/order";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { topic, id } = req.query;

  if (topic == "merchant_order") {
    const order = await merchantOrder(id);
    // console.log(order);
    // if (order.order_status == "paid") {
    //   const orderId = order.external_reference;
    //   const myOrder = new Order(orderId);
    //   myOrder.pull();
    //   myOrder.data.status = "closed";
    //   await myOrder.push();
    //send email to user with order details (tu pago fue confirmado)
    //send email to admin with order details (alguien compro algo)
    // }
  }
  res.send("ok");
}