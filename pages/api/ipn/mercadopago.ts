import { getMerchantOrder, merchantOrder } from "lib/mercadopago";
import type { NextApiRequest, NextApiResponse } from "next";
import { Order } from "models/order";
import { z } from "zod";
import { checkCodeExpires } from "controller/auth";
import { byMethod } from "lib/middlewares";

const EndpointQuerySchema = z
  .object({
    topic: z.string(),
    id: z.string(),
  })
  .required();

const handler = byMethod({
  async post(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { topic, id } = EndpointQuerySchema.parse(req.query);
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
