import type { NextApiRequest, NextApiResponse } from "next";
import parseToken from "parse-bearer-token";
import { decode } from "./jwt";
import cors from "cors";

export function authMiddleware(callback) {
  return function (req: NextApiRequest, res: NextApiResponse) {
    const token = parseToken(req);
    if (!token) {
      res.status(401).send({ message: "no autorizado" });
    }

    const decodedToken = decode(token);

    if (decodedToken) {
      callback(req, res, decodedToken);
    } else {
      res.status(401).send({ message: "token incorrecto" });
    }
  };
}

function allowCors(fn) {
  return async (...params) => {
    const [req, res] = params;

    return new Promise((resolve, reject) => {
      cors()(req, res, () => {
        const result = fn(...params);
        resolve(result);
      });
    });
  };
}

export function byMethod(methodsHandler) {
  const methods = require("micro-method-router");
  return allowCors(methods(methodsHandler));
}
