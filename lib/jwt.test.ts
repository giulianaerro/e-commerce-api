import test from "ava";
import { generate, decode } from "./jwt";

test("jwt encode/decode", (t) => {
  const payLoad = { giuli: true };
  const token = generate(payLoad);
  const salida: any = decode(token);
  delete salida.iat;

  t.deepEqual(payLoad, salida);
});
