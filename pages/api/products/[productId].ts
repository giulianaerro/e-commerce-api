import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware, byMethod } from "lib/middlewares";
import { getProductById } from "controller/product";

const handler = byMethod({
  async get(req: NextApiRequest, res: NextApiResponse, token) {
    const productById = await getProductById(req.query.productId as string);
    res.status(200).json(productById);
  },
});
export default authMiddleware(handler);
