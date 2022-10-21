import { getOrderById } from "controller/order";
import { authMiddleware } from "lib/middlewares";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const orderById = await getOrderById(req.query.orderId as string);
  res.status(200).json(orderById);
}

export default authMiddleware(handler);
