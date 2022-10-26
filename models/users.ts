import { firestore } from "lib/firestore";

const collection = firestore.collection("users");
export class Users {
  ref: FirebaseFirestore.DocumentReference;
  data: any;
  id: string;
  constructor(id) {
    this.id = id;
    this.ref = collection.doc(id);
  }
  async pull() {
    const snap = await this.ref.get();
    this.data = snap.data();
  }
  async push() {
    this.ref.update(this.data);
  }
  static async createNewUser(data) {
    const newUserSnap = await collection.add(data);
    const newUser = new Users(newUserSnap.id);
    newUser.data = data;
    return newUser;
  }
}
