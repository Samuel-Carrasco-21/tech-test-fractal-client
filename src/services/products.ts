import backendInstance from '@/lib/backendInstance';
import {
  ICreateProduct,
  IProductResponse,
  IUpdateProduct,
} from '@/schemas/products';
import { IResponse } from '../schemas/services/response';

/**
 * @description Obtiene todos los productos de la API.
 * @returns Una promesa que resuelve a un array de productos o null.
 */
export const getAllProducts = async (): Promise<IProductResponse[] | null> => {
  try {
    const { success, status, data } = (await backendInstance.get(
      '/products'
    )) as IResponse;
    if (success && status === 200) {
      return data as IProductResponse[];
    } else {
      console.error('Failed to fetch all products:', status, data?.message);
      return null;
    }
  } catch (error) {
    console.error('Error getting all products:', error);
    return null;
  }
};

/**
 * @description Obtiene un producto específico por su ID.
 * @param productId El ID del producto a buscar.
 * @returns Una promesa que resuelve al producto encontrado o null.
 */
export const getProductById = async (
  productId: string
): Promise<IProductResponse | null> => {
  try {
    const { success, status, data } = (await backendInstance.get(
      `/products/${productId}`
    )) as IResponse;
    if (success && status === 200) {
      return data as IProductResponse;
    } else {
      console.error('Failed to fetch product by ID:', status, data?.message);
      return null;
    }
  } catch (error) {
    console.error('Error getting product by ID:', error);
    return null;
  }
};

/**
 * @description Crea un nuevo producto.
 * @param productData Los datos del producto a crear.
 * @returns Una promesa que resuelve al producto recién creado o null.
 */
export const createProduct = async (
  productData: ICreateProduct
): Promise<IProductResponse | null> => {
  try {
    const { success, status, data } = (await backendInstance.post(
      '/products',
      productData
    )) as IResponse;
    // La creación exitosa devuelve un status 201
    if (success && status === 201) {
      return data as IProductResponse;
    } else {
      console.error('Failed to create product:', status, data?.message);
      return null;
    }
  } catch (error) {
    console.error('Error creating product:', error);
    return null;
  }
};

/**
 * @description Actualiza un producto existente.
 * @param productId El ID del producto a actualizar.
 * @param productData Los datos a actualizar.
 * @returns Una promesa que resuelve al producto actualizado o null.
 */
export const updateProduct = async (
  productId: string,
  productData: IUpdateProduct
): Promise<IProductResponse | null> => {
  try {
    const { success, status, data } = (await backendInstance.patch(
      `/products/${productId}`,
      productData
    )) as IResponse;
    if (success && status === 200) {
      return data as IProductResponse;
    } else {
      console.error('Failed to update product:', status, data?.message);
      return null;
    }
  } catch (error) {
    console.error('Error updating product:', error);
    return null;
  }
};

/**
 * @description Elimina un producto.
 * @param productId El ID del producto a eliminar.
 * @returns Una promesa que resuelve a true si fue exitoso, de lo contrario false.
 */
export const deleteProduct = async (productId: string): Promise<boolean> => {
  try {
    const { success, status } = (await backendInstance.delete(
      `/products/${productId}`
    )) as IResponse;
    if (success && status === 200) {
      return true;
    } else {
      console.error('Failed to delete product:', status);
      return false;
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    return false;
  }
};
