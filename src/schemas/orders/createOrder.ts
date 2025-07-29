interface ICreateOrderItem {
  productId: string;
  quantity: number;
}

export interface ICreateOrder {
  orderNumber: string;
  items: ICreateOrderItem[];
}
