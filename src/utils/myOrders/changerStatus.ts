import { OrderStatusEnum } from '@/enums/orderStatusEnum';

export const changerStatus = (prevStatus: OrderStatusEnum): OrderStatusEnum => {
  const { PENDING, IN_PROGRESS, COMPLETED } = OrderStatusEnum;
  return prevStatus === PENDING ? IN_PROGRESS : COMPLETED;
};
