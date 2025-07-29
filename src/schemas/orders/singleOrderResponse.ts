import { IOrderItemResponse } from './orderItemResponse';
import { IOrderListResponse } from './orderListResponse';

export interface ISingleOrderResponse extends IOrderListResponse {
  items: IOrderItemResponse[];
}
