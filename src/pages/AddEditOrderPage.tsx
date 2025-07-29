import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';

import OrderForm from '@/components/addEditOrder/OrderForm';
import AddProductModal from '@/components/addEditOrder/AddProductModal';
import { useAppDispatch, useAppSelector } from '../hooks/useStore';
import {
  IOrderItemResponse,
  ICreateOrder,
  IUpdateOrderItems,
} from '../schemas/orders';
import { IProductResponse } from '../schemas/products';
import {
  selectSelectedOrder,
  selectOrdersStatus,
  fetchOrderById,
  clearSelectedOrder,
} from '../store/ordersSlice';
import { selectAllProducts, fetchProducts } from '../store/productsSlice';
import OrderItemsGrid from '../components/addEditOrder/OrderItemsGrid';
import { createOrder, updateOrder } from '../services/orders';

// Estado local para manejar el formulario
interface FormState {
  orderNumber: string;
  items: IOrderItemResponse[];
}

const AddEditOrderPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isEditMode = Boolean(orderId);
  const selectedOrder = useAppSelector(selectSelectedOrder);
  const status = useAppSelector(selectOrdersStatus);
  const availableProducts = useAppSelector(selectAllProducts);

  const [formState, setFormState] = useState<FormState>({
    orderNumber: '',
    items: [],
  });
  const [isModalOpen, setModalOpen] = useState(false);

  // Efecto para cargar datos
  useEffect(() => {
    // Cargar la lista de productos disponibles para el modal
    dispatch(fetchProducts());
    if (isEditMode && orderId) {
      dispatch(fetchOrderById(orderId));
    }
    // Limpiar el estado del pedido seleccionado al desmontar el componente
    return () => {
      dispatch(clearSelectedOrder());
    };
  }, [dispatch, orderId, isEditMode]);

  // Efecto para sincronizar el estado del formulario cuando el pedido seleccionado cambia
  useEffect(() => {
    if (isEditMode && selectedOrder) {
      setFormState({
        orderNumber: selectedOrder.orderNumber,
        items: selectedOrder.items,
      });
    }
  }, [selectedOrder, isEditMode]);

  const handleOrderNumberChange = (value: string) => {
    setFormState(prev => ({ ...prev, orderNumber: value }));
  };

  const handleAddItem = (product: IProductResponse, quantity: number) => {
    setFormState(prev => {
      const existingItem = prev.items.find(
        item => item.productId === product.id
      );
      if (existingItem) {
        // Actualizar cantidad si el producto ya existe
        return {
          ...prev,
          items: prev.items.map(item =>
            item.productId === product.id
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                  totalPrice: (item.quantity + quantity) * item.priceAtOrder,
                }
              : item
          ),
        };
      } else {
        // Añadir nuevo producto
        return {
          ...prev,
          items: [
            ...prev.items,
            {
              productId: product.id,
              productName: product.name,
              quantity: quantity,
              priceAtOrder: product.unitPrice,
              totalPrice: product.unitPrice * quantity,
            },
          ],
        };
      }
    });
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    setFormState(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.productId === productId
          ? {
              ...item,
              quantity: newQuantity,
              totalPrice: newQuantity * item.priceAtOrder,
            }
          : item
      ),
    }));
  };

  const handleRemoveItem = (productId: string) => {
    setFormState(prev => ({
      ...prev,
      items: prev.items.filter(item => item.productId !== productId),
    }));
  };

  const handleSaveOrder = async () => {
    // La validación del formulario podría ir aquí
    if (!formState.orderNumber) {
      alert('El número de pedido es obligatorio.');
      return;
    }

    if (isEditMode && orderId) {
      // --- Lógica de ACTUALIZACIÓN ---
      const payload: IUpdateOrderItems = {
        orderNumber: formState.orderNumber,
        items: formState.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      };
      await updateOrder(orderId, { ...payload });
    } else {
      const payload: ICreateOrder = {
        orderNumber: formState.orderNumber,
        items: formState.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      };
      await createOrder(payload);
    }

    navigate('/my-orders');
    window.location.reload();
  };

  // --- Campos calculados para el formulario ---
  const productCount = formState.items.length;
  const finalPrice = formState.items.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );
  const currentDate = new Date().toLocaleDateString();

  if (status === 'loading' && isEditMode) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h2" gutterBottom>
        {isEditMode ? 'Editar Pedido' : 'Añadir Pedido'}
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <OrderForm
        orderNumber={formState.orderNumber}
        onOrderNumberChange={handleOrderNumberChange}
        date={currentDate}
        productCount={productCount}
        finalPrice={finalPrice}
        isEditMode={isEditMode}
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h3">Productos en el Pedido</Typography>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => setModalOpen(true)}
        >
          Añadir Producto
        </Button>
      </Box>

      <OrderItemsGrid
        rows={formState.items}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<SaveIcon />}
          onClick={handleSaveOrder}
        >
          {isEditMode ? 'Guardar Cambios' : 'Crear Pedido'}
        </Button>
      </Box>

      <AddProductModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        products={availableProducts}
        onAddProduct={handleAddItem}
      />
    </Paper>
  );
};

export default AddEditOrderPage;
