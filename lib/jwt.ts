import jwt from "jsonwebtoken";

export function generate(obj) {
  return jwt.sign(obj, process.env.JWT_SECRET);
}

export function decode(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    console.log("token incorrecto");
    return null;
  }
}
