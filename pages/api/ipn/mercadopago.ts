import { getMerchantOrder, merchantOrder } from "lib/mercadopago";
import type { NextApiRequest, NextApiResponse } from "next";
import { Order } from "models/order";
import { byMethod } from "lib/middlewares";

const handler = byMethod({
  async post(req: NextApiRequest, res: NextApiResponse) {
    const { topic, id } = req.query;
    try {
      if (topic == "merchant_order") {
        const respuesta = await merchantOrder(id);
        res.send(respuesta);
      }
    } catch (error) {
      res.send(error);
    }
  },
});
export default handler;
