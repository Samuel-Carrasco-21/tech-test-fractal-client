import { OrderStatusEnum } from '@/enums/orderStatusEnum';

export const statusTranslator = (prevStatus: OrderStatusEnum): string => {
  const { PENDING, IN_PROGRESS } = OrderStatusEnum;
  return prevStatus === PENDING
    ? 'Pendiente'
    : prevStatus === IN_PROGRESS
      ? 'En Progreso'
      : 'Completado';
};
