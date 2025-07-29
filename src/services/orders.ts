import backendInstance from '@/lib/backendInstance';
import {
  ICreateOrder,
  IOrderListResponse,
  ISingleOrderResponse,
  IUpdateOrder,
  IUpdateOrderItems,
} from '@/schemas/orders';
import { IResponse } from '../schemas/services/response';

export const getAllOrders = async (): Promise<IOrderListResponse[] | null> => {
  try {
    const { success, status, data } = (await backendInstance.get(
      '/orders'
    )) as IResponse;
    if (success && status === 200) {
      return data as IOrderListResponse[];
    } else {
      console.error('Failed to fetch all orders:', status, data?.message);
      return null;
    }
  } catch (error) {
    console.error('Error getting all orders:', error);
    return null;
  }
};

export const getOrderById = async (
  orderId: string
): Promise<ISingleOrderResponse | null> => {
  try {
    const { success, status, data } = (await backendInstance.get(
      `/orders/${orderId}`
    )) as IResponse;
    if (success && status === 200) {
      return data as ISingleOrderResponse;
    } else {
      console.error('Failed to fetch order by ID:', status, data?.message);
      return null;
    }
  } catch (error) {
    console.error('Error getting order by ID:', error);
    return null;
  }
};

export const createOrder = async (
  orderData: ICreateOrder
): Promise<ISingleOrderResponse | null> => {
  try {
    const { success, status, data } = (await backendInstance.post(
      '/orders',
      orderData
    )) as IResponse;
    if (success && status === 201) {
      return data as ISingleOrderResponse;
    } else {
      console.error('Failed to create order:', status, data?.message);
      return null;
    }
  } catch (error) {
    console.error('Error creating order:', error);
    return null;
  }
};

export const updateOrder = async (
  orderId: string,
  orderData: IUpdateOrderItems
): Promise<ISingleOrderResponse | null> => {
  try {
    const { success, status, data } = (await backendInstance.patch(
      `/orders/data/${orderId}`,
      orderData
    )) as IResponse;
    if (success && status === 200) {
      return data as ISingleOrderResponse;
    } else {
      console.error('Failed to update order:', status, data?.message);
      return null;
    }
  } catch (error) {
    console.error('Error updating order:', error);
    return null;
  }
};

export const updateOrderStatus = async (
  orderId: string,
  statusData: IUpdateOrder
): Promise<ISingleOrderResponse | null> => {
  try {
    const { success, status, data } = (await backendInstance.patch(
      `/orders/status/${orderId}`,
      statusData
    )) as IResponse;
    if (success && status === 200) {
      return data as ISingleOrderResponse;
    } else {
      console.error('Failed to update order status:', status, data?.message);
      return null;
    }
  } catch (error) {
    console.error('Error updating order status:', error);
    return null;
  }
};

export const deleteOrder = async (orderId: string): Promise<boolean> => {
  try {
    const { success, status } = (await backendInstance.delete(
      `/orders/${orderId}`
    )) as IResponse;
    if (success && status === 200) {
      return true;
    } else {
      console.error('Failed to delete order:', status);
      return false;
    }
  } catch (error) {
    console.error('Error deleting order:', error);
    return false;
  }
};
