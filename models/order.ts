import { firestore } from "lib/firestore";

const collection = firestore.collection("orders");

export class Order {
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
  static async createNewOrder(newOrderData = {}) {
    const newOrderSnap = await collection.add(newOrderData);
    const newOrder = new Order(newOrderSnap.id);
    newOrder.data = newOrderData;
    return newOrder;
  }
  static async getOrderById(orderId: string) {
    const orderById = await collection.doc(orderId).get();
    return orderById.data();
  }
  static async getUserOrdersById(userId: string) {
    const userOrdersById = await collection.where("userId", "==", userId).get();

    const myOrders = [];
    userOrdersById.forEach((doc) => {
      const order = new Order(doc.id);
      order.data = doc.data();
      myOrders.push(order.data);
    });

    return myOrders;
  }
}
