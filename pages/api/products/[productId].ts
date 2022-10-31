import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware, byMethod } from "lib/middlewares";
import { getProductById } from "controller/product";
import { z } from "zod";

const EndpointQuerySchema = z
  .object({
    productId: z.string(),
  })
  .required();

const handler = byMethod({
  async get(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { productId } = EndpointQuerySchema.parse(req.query);
      const productById = await getProductById(productId);
      res.status(200).json(productById);
    } catch (error) {
      res.status(404).send(error);
    }
  },
});
export default authMiddleware(handler);
