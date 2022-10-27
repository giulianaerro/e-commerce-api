import { Auth } from "models/auth";
import { Users } from "models/users";
import gen from "random-seed";
import { addMinutes } from "date-fns";
import { emailMessageCode, sendEmail } from "lib/sendgrid";
import { generate } from "lib/jwt";

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

export async function sendCode(email: string): Promise<{ emailSent: Boolean }> {
  const auth = await findOrCreateAuth(email);
  if (!auth) return null;

  const code = gen.create().intBetween(10000, 99999);
  auth.data.code = code;
  const now = new Date();
  const twentyMinutesFromNow = addMinutes(now, 20);
  auth.data.expires = twentyMinutesFromNow;
  await auth.push();

  const contentEmailMessage = emailMessageCode(code);
  const emailSent = await sendEmail(
    email,
    "Código de seguridad",
    contentEmailMessage
  );

  return { emailSent };
}
export async function checkCodeExpires(auth: Auth) {
  const expires = auth.isCodeExpires();
  if (expires) {
    throw `Codigo expirado`;
  } else {
    const token = generate({ userId: auth.data.userId });
    return { token };
  }
}
