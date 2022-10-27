import { Users } from "models/users";

type UserData = {
  name?: string;
  address?: string;
};

export async function editUser(data: UserData, userId: string) {
  const userData = new Users(userId);
  userData.data = data;
  await userData.push();
}
