import type { NextApiRequest, NextApiResponse } from "next";
import { Users } from "models/users";
import { authMiddleware, byMethod } from "lib/middlewares";
import { editUser } from "controller/user";

const handler = byMethod({
  async get(req: NextApiRequest, res: NextApiResponse, token) {
    try {
      const user = new Users(token.userId);
      await user.pull();

      res.send(user.data);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  async patch(req: NextApiRequest, res: NextApiResponse, token) {
    try {
      const newData = req.body;
      await editUser(newData, token.userId);

      res.send("ok");
    } catch (error) {
      res.status(400).send(error);
    }
  },
});
export default authMiddleware(handler);
