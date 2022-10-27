import { getOrderById } from "controller/order";
import { authMiddleware, byMethod } from "lib/middlewares";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const EndpointQuerySchema = z
  .object({
    orderId: z.string(),
  })
  .required();

const handler = byMethod({
  async get(req: NextApiRequest, res: NextApiResponse) {
    const { orderId } = EndpointQuerySchema.parse(req.query);
    try {
      const orderById = await getOrderById(orderId);
      res.status(200).json(orderById);
    } catch (error) {
      res.status(404).send(error);
    }
  },
});
export default authMiddleware(handler);
