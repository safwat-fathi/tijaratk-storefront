import { HttpService } from "@/services/base";
import type { PublicOrder } from "@/types/services/orders";

export class OrdersPublicApiService extends HttpService {
  constructor() {
    super("/public/orders");
  }

  public getOrder(orderId: string | number) {
    return this.get<PublicOrder>(String(orderId));
  }
}

export const ordersPublicApiService = new OrdersPublicApiService();
