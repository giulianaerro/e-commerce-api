import type { NextApiRequest, NextApiResponse } from "next";
import { generate } from "lib/jwt";
import { Auth } from "models/auth";
import { byMethod } from "lib/middlewares";

const handler = byMethod({
  async post(req: NextApiRequest, res: NextApiResponse) {
    const auth = await Auth.findByEmailByCode(req.body.email, req.body.code);
    if (!auth) {
      res.status(404).send({ message: "email o codigo no coinciden" });
    }
    const expires = auth.isCodeExpires();
    if (expires) {
      res.status(404).send({ message: "code expirado" });
    }
    const token = generate({ userId: auth.data.userId });
    res.send({ token });
  },
});
export default handler;
