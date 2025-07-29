import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  IOrderListResponse,
  ISingleOrderResponse,
  ICreateOrder,
  IUpdateOrderItems,
} from '@/schemas/orders';
import * as orderServices from '@/services/orders';
import { OrdersStatus } from '../types/ordersStatus';
import { RootState } from '.';

interface OrdersState {
  list: IOrderListResponse[];
  selectedOrder: ISingleOrderResponse | null;
  status: OrdersStatus;
  error: string | null;
}

const initialState: OrdersState = {
  list: [],
  selectedOrder: null,
  status: 'idle',
  error: null,
};

// --- Thunks Asíncronos ---
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await orderServices.getAllOrders();
  return response || [];
});

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (orderId: string) => {
    const response = await orderServices.getOrderById(orderId);
    return response;
  }
);

export const createNewOrder = createAsyncThunk(
  'orders/createNewOrder',
  async (orderData: ICreateOrder) => {
    const response = await orderServices.createOrder(orderData);
    return response;
  }
);

export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (orderId: string) => {
    await orderServices.deleteOrder(orderId);
    return orderId; // Devolvemos el ID para saber cuál eliminar del estado
  }
);

export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async (
    { id, data }: { id: string; data: IUpdateOrderItems },
    { rejectWithValue }
  ) => {
    try {
      const response = await orderServices.updateOrder(id, data);
      if (!response) {
        throw new Error(
          'La respuesta del servidor para la actualización fue nula.'
        );
      }
      return response;
    } catch (error) {
      console.error(error);
      return rejectWithValue('No se pudo actualizar el pedido.');
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // Reducer síncrono para limpiar el estado del pedido seleccionado
    // al salir de la vista de edición.
    clearSelectedOrder: state => {
      state.selectedOrder = null;
    },
  },
  extraReducers: builder => {
    builder
      // Fetch All Orders (List View)
      .addCase(fetchOrders.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<IOrderListResponse[]>) => {
          state.status = 'succeeded';
          state.list = action.payload;
        }
      )
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch orders';
      })
      // Fetch Single Order (Detail/Edit View)
      .addCase(fetchOrderById.pending, state => {
        state.status = 'loading';
        state.selectedOrder = null; // Limpiar antes de cargar
      })
      .addCase(
        fetchOrderById.fulfilled,
        (state, action: PayloadAction<ISingleOrderResponse | null>) => {
          state.status = 'succeeded';
          state.selectedOrder = action.payload;
        }
      )
      // Create New Order
      .addCase(
        createNewOrder.fulfilled,
        (state, action: PayloadAction<ISingleOrderResponse | null>) => {
          if (action.payload) {
            // Añadir a la lista para feedback inmediato sin re-fetch
            const { ...listVersion } = action.payload;
            state.list.push(listVersion);
          }
        }
      )
      // Delete Order
      .addCase(
        deleteOrder.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.list = state.list.filter(order => order.id !== action.payload);
        }
      );
  },
});

export const { clearSelectedOrder } = ordersSlice.actions;

// Selectors
export const selectAllOrders = (state: RootState) => state.orders.list;
export const selectSelectedOrder = (state: RootState) =>
  state.orders.selectedOrder;
export const selectOrdersStatus = (state: RootState) => state.orders.status;

export default ordersSlice.reducer;
