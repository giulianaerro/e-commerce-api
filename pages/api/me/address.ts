import type { NextApiRequest, NextApiResponse } from "next";
import { Users } from "models/users";
import { authMiddleware, byMethod } from "lib/middlewares";
import { z } from "zod";
import { editUser } from "controller/user";

const EndpointQuerySchema = z
  .object({
    address: z.string(),
  })
  .required();

const handler = byMethod({
  async patch(req: NextApiRequest, res: NextApiResponse, token) {
    try {
      const address = EndpointQuerySchema.parse(req.body);
      await editUser(address, token.userId);

      res.send("ok");
    } catch (error) {
      res.send(error);
    }
  },
});
export default authMiddleware(handler);
