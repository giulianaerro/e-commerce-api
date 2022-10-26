import type { NextApiRequest, NextApiResponse } from "next";
import { sendCode } from "controller/auth";
import { byMethod } from "lib/middlewares";

const handler = byMethod({
  async post(req: NextApiRequest, res: NextApiResponse) {
    const result = await sendCode(req.body.email as string);
    res.send(result);
  },
});
export default handler;
