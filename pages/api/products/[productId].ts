import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middlewares";
import { getProductById } from "controller/product";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const productById = await getProductById(req.query.productId as string);
  res.status(200).json(productById);
}

export default authMiddleware(handler);
