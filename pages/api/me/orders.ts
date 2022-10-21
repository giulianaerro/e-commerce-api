import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middlewares";
import { getUserOrdersById } from "controller/order";

async function handler(req: NextApiRequest, res: NextApiResponse, token) {
  const userOrders = await getUserOrdersById(token.userId);

  res.send({ userOrders });
}

export default authMiddleware(handler);
