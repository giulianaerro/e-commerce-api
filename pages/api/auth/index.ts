import type { NextApiRequest, NextApiResponse } from "next";
import { sendCode } from "controller/auth";
import { byMethod } from "lib/middlewares";
import { z } from "zod";

const EndpointQuerySchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
  })
  .required();

const handler = byMethod({
  async post(req: NextApiRequest, res: NextApiResponse) {
    const { email } = EndpointQuerySchema.parse(req.body);
    try {
      const result = await sendCode(email);
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  },
});
export default handler;
