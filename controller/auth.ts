import { Auth } from "models/auth";
import { Users } from "models/users";
import gen from "random-seed";
import { addMinutes } from "date-fns";

var seed = "aisjdhfjiasf";
var random = gen.create(seed);

export async function findOrCreateAuth(email: string): Promise<Auth> {
  const cleanEmail = email.trim().toLowerCase();

  const auth = await Auth.findByEmail(cleanEmail);

  if (auth) {
    return auth;
  } else {
    const newUser = await Users.createNewUser({
      email: cleanEmail,
    });
    const newAuth = await Auth.createNewAuth({
      email: cleanEmail,
      userId: newUser.id,
      code: "",
      expires: new Date(),
    });
    return newAuth;
  }
}

export async function sendCode(email: string) {
  const auth = await findOrCreateAuth(email);
  const code = random.intBetween(10000, 99999);
  auth.data.code = code;
  const now = new Date();
  const twentyMinutesFromNow = addMinutes(now, 20);
  auth.data.expires = twentyMinutesFromNow;
  await auth.push();
  console.log("email enviado a " + email + " con codigo " + auth.data.code);
  return true;
}
