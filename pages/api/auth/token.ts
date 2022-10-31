import type { NextApiRequest, NextApiResponse } from "next";
import { Auth } from "models/auth";
import { byMethod } from "lib/middlewares";
import { z } from "zod";
import { checkCodeExpires } from "controller/auth";

const EndpointQuerySchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    code: z.number().int().positive({ message: "Invalid code" }),
  })
  .required();

const handler = byMethod({
  async post(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { email, code } = EndpointQuerySchema.parse(req.body);
      const auth = await Auth.findByEmailByCode(email, code);
      if (!auth) {
        res.status(404).send({ message: "email o codigo no coinciden" });
      }

      const token = await checkCodeExpires(auth);

      res.send(token);
    } catch (error) {
      res.status(404).send(error);
    }
  },
});
export default handler;
