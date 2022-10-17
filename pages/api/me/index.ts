import type { NextApiRequest, NextApiResponse } from "next";
import { Users } from "models/users";
import { authMiddleware } from "lib/middlewares";

async function handler(req: NextApiRequest, res: NextApiResponse, token) {
  const user = new Users(token.userId);
  await user.pull();

  res.send(user.data);
}

export default authMiddleware(handler);
