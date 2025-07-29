import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ICreateProduct, IProductResponse } from '@/schemas/products';
import * as productServices from '@/services/products';
import { RootState } from '.';

interface ProductsState {
  items: IProductResponse[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
};

// --- Thunks Asíncronos ---
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await productServices.getAllProducts();
    return response || [];
  }
);

export const addNewProduct = createAsyncThunk(
  'products/addNewProduct',
  async (productData: ICreateProduct) => {
    const response = await productServices.createProduct(productData);
    return response;
  }
);

// --- Slice ---
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<IProductResponse[]>) => {
          state.status = 'succeeded';
          state.items = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      })
      // Add New Product
      .addCase(
        addNewProduct.fulfilled,
        (state, action: PayloadAction<IProductResponse | null>) => {
          if (action.payload) {
            state.items.push(action.payload);
          }
        }
      );
  },
});

// Selectors
export const selectAllProducts = (state: RootState) => state.products.items;
export const selectProductsStatus = (state: RootState) => state.products.status;

export default productsSlice.reducer;
