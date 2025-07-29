interface IUpdateOrderItem {
  productId: string;
  quantity: number;
}

export interface IUpdateOrderItems {
  orderNumber?: string;
  items?: IUpdateOrderItem[];
}
