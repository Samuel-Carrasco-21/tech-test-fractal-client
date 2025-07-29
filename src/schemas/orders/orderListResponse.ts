import { OrderStatusEnum } from '@/enums/orderStatusEnum';

export interface IOrderListResponse {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatusEnum;
  productCount: number;
  finalPrice: number;
}
