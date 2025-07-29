import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ConfirmationModal from '@/components/ConfirmationModal';
import OrdersDataGrid from '@/components/myOrders/OrdersDataGrid';
import { deleteOrder, updateOrderStatus } from '../services/orders';
import {
  selectAllOrders,
  selectOrdersStatus,
  fetchOrders,
} from '../store/ordersSlice';
import { useAppDispatch, useAppSelector } from '../hooks/useStore';
import { OrderStatusEnum } from '../enums/orderStatusEnum';
import { changerStatus } from '../utils/myOrders/changerStatus';

const MyOrdersPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const orders = useAppSelector(selectAllOrders);
  const status = useAppSelector(selectOrdersStatus);

  const [modalState, setModalState] = useState({ open: false, orderId: '' });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchOrders());
    }
  }, [status, dispatch]);

  const handleEdit = (id: string) => navigate(`/add-order/${id}`);

  const handleStatusChange = (id: string, prevStatus: OrderStatusEnum) => {
    dispatch(() =>
      updateOrderStatus(id, {
        status: changerStatus(prevStatus),
      })
    );
    window.location.reload();
  };

  const handleDeleteClick = (id: string) =>
    setModalState({ open: true, orderId: id });

  const handleConfirmDelete = () => {
    const { orderId } = modalState;
    dispatch(() => deleteOrder(orderId));
    setModalState({ open: false, orderId: '' });
    window.location.reload();
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h2">Mis Pedidos</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/add-order')}
        >
          Añadir Nuevo Pedido
        </Button>
      </Box>

      {status === 'loading' && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {status === 'succeeded' && (
        <OrdersDataGrid
          rows={orders}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          onChangeStatus={handleStatusChange}
        />
      )}

      <ConfirmationModal
        open={modalState.open}
        onClose={() => setModalState({ open: false, orderId: '' })}
        onConfirm={handleConfirmDelete}
        title="Confirmar Eliminación"
        message="¿Estás seguro de que deseas eliminar este pedido? Esta acción no se puede deshacer."
      />
    </>
  );
};

export default MyOrdersPage;
