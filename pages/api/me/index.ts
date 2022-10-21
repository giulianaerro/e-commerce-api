import type { NextApiRequest, NextApiResponse } from "next";
import { Users } from "models/users";
import { authMiddleware, byMethod } from "lib/middlewares";

const handler = byMethod({
  async get(req: NextApiRequest, res: NextApiResponse, token) {
    const user = new Users(token.userId);
    await user.pull();

    res.send(user.data);
  },
  async patch(req: NextApiRequest, res: NextApiResponse, token) {
    const userData = new Users(token.userId);
    userData.data = req.body;
    await userData.push();

    res.send(userData);
  },
});
export default authMiddleware(handler);
