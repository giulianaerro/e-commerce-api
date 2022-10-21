import type { NextApiRequest, NextApiResponse } from "next";
import { Users } from "models/users";
import { authMiddleware, byMethod } from "lib/middlewares";

const handler = byMethod({
  async patch(req: NextApiRequest, res: NextApiResponse, token) {
    const address = new Users(token.userId);
    address.data = req.body;
    await address.push();

    res.send(address);
  },
});
export default authMiddleware(handler);
