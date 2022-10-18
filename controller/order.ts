import { createPreference } from "lib/mercadopago";
import { Order } from "models/order";
import { getProductById } from "./product";

export async function newOrder({ aditionalInfo, productId, userId, status }) {
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
        picture_url: productById.Images[0].url,
        category_id: productById.category,
        quantity: 1,
        currency_id: "ARS",
        unit_price: productById.price,
      },
    ],
    notification_url:
      "https://e-commerce-estructura.vercel.app/api/webhooks/mercadopago",
    back_urls: {
      success: "https://apx.school/",
    },
  });

  return pref.init_point;
}
