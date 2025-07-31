export interface OrderModal {
  open: boolean;
  orderId: string;
  title: string;
  message: string;
  variant?: 1 | 2;
}
