import { OrderStatusEnum } from '@/enums/orderStatusEnum';

export interface IUpdateOrder {
  status: OrderStatusEnum;
}
