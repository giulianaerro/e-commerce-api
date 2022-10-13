import { firestore } from "lib/firestore";
import isAfter from "date-fns/isAfter";
const collection = firestore.collection("auth");

export class Auth {
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

  isCodeExpires() {
    const now = new Date();

    return isAfter(now, this.data.expires.toDate());
  }

  static async findByEmail(email: string) {
    const cleanEmail = Auth.cleanEmail(email);
    const results = await collection.where("email", "==", cleanEmail).get();
    if (results.docs.length) {
      const newAuth = new Auth(results.docs[0].id);
      newAuth.data = results.docs[0].data();
      return newAuth;
    } else {
      return null;
    }
  }

  static async createNewAuth(data) {
    const newUserSnap = await collection.add(data);
    const newUser = new Auth(newUserSnap.id);
    newUser.data = data;
    return newUser;
  }

  static cleanEmail(email: string) {
    return email.trim().toLowerCase();
  }

  static async findByEmailByCode(email: string, code: number) {
    const cleanEmail = Auth.cleanEmail(email);

    const results = await collection
      .where("email", "==", cleanEmail)
      .where("code", "==", code)
      .get();
    if (results.empty) {
      console.error("email no coincide");
      return null;
    } else {
      const auth = new Auth(results.docs[0].id);
      auth.data = results.docs[0].data();
      return auth;
    }
  }
}
