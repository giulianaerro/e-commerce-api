import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middlewares";
import method from "micro-method-router";
import { newOrder } from "controller/order";

async function postHandler(req: NextApiRequest, res: NextApiResponse, token) {
  if (!req.query.productId) {
    res.status(404).json({ error: "Product not found" });
  }
  const order = await newOrder({
    aditionalInfo: req.body,
    productId: req.query.productId as any,
    userId: token.userId,
    status: "pending",
  });

  res.send({ url: order });
}

const handler = method({
  post: postHandler,
});
export default authMiddleware(handler);
