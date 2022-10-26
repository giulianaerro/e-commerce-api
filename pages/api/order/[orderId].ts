import { getOrderById } from "controller/order";
import { authMiddleware, byMethod } from "lib/middlewares";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = byMethod({
  async get(req: NextApiRequest, res: NextApiResponse, token) {
    const orderById = await getOrderById(req.query.orderId as string);
    res.status(200).json(orderById);
  },
});
export default authMiddleware(handler);
