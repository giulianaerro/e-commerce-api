import { getMerchantOrder, merchantOrder } from "lib/mercadopago";
import type { NextApiRequest, NextApiResponse } from "next";
import { Order } from "models/order";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { topic, id } = req.query;

  if (topic == "merchant_order") {
   await merchantOrder(id);
  }
  res.send("ok");
}
