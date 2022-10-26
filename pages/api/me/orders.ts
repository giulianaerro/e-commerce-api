import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware, byMethod } from "lib/middlewares";
import { getUserOrdersById } from "controller/order";

const handler = byMethod({
  async get(req: NextApiRequest, res: NextApiResponse, token) {
    const userOrders = await getUserOrdersById(token.userId);

    res.send({ userOrders });
  },
});
export default authMiddleware(handler);
