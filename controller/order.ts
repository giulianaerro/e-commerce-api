import { createPreference } from "lib/mercadopago";
import { Order } from "models/order";
import { getProductById } from "./product";

type OrderProps = {
  aditionalInfo: {};
  productId: string;
  userId: string;
  status: string;
};

export async function newOrder({
  aditionalInfo,
  productId,
  userId,
  status,
}: OrderProps) {
  const productById = (await getProductById(productId)) as any;

  const order = await Order.createNewOrder({
    aditionalInfo,
    productId,
    userId,
    status,
  });
  const pref = await createPreference({
    external_reference: order.id,
    items: [
      {
        title: productById.title,
        description: productById.description,
        picture_url: productById.image[0].url,
        category_id: productById.category,
        quantity: 1,
        currency_id: "ARS",
        unit_price: productById.price,
      },
    ],
    notification_url:
      "https://webhook.site/17a6335e-087b-4fe0-8b3c-bb61b5a7ccdf",
    back_urls: {
      success: "https://apx.school/",
    },
  });

  return { url: pref.init_point, orderId: pref.external_reference };
}

export async function getOrderById(id: string) {
  const product = await Order.getOrderById(id);
  return product;
}

export async function getUserOrdersById(userId: string) {
  const orders = await Order.getUserOrdersById(userId);
  return orders;
}
