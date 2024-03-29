import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware, byMethod } from "lib/middlewares";
import { getUserOrdersById } from "controller/order";

const handler = byMethod({
  async get(req: NextApiRequest, res: NextApiResponse, token) {
    try {
      const userOrders = await getUserOrdersById(token.userId);

      res.send({ userOrders });
    } catch (error) {
      res.status(404).send(error);
    }
  },
});
export default authMiddleware(handler);
