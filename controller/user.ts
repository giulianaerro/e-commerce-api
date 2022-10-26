import { Users } from "models/users";

export async function editUser(data: {}, userId: string) {
  const userData = new Users(userId);
  userData.data = data;
  await userData.push();
}
