import SearchBox from '@/components/SearchBox';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../components/ConfirmationModal';
import OrdersDataGrid from '../components/myOrders/OrdersDataGrid';
import { OrderStatusEnum } from '../enums/orderStatusEnum';
import { useAppDispatch, useAppSelector } from '../hooks/useStore';
import { updateOrderStatus, deleteOrder } from '../services/orders';
import {
  selectAllOrders,
  selectOrdersStatus,
  fetchOrders,
} from '../store/ordersSlice';
import { changerStatus } from '../utils/myOrders/changerStatus';
import AddIcon from '@mui/icons-material/Add';
import { OrderModal } from '../schemas/orders/orderModal';

const MyOrdersPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const orders = useAppSelector(selectAllOrders);
  const status = useAppSelector(selectOrdersStatus);

  const [modalState, setModalState] = useState<OrderModal | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchOrders());
    }
  }, [status, dispatch]);

  const handleEdit = useCallback(
    (id: string, status: OrderStatusEnum) => {
      if (status !== OrderStatusEnum.PENDING) {
        setModalState({
          orderId: '',
          title: 'Wow',
          message: 'No se puede editar una orden en progreso o completada',
          open: true,
          variant: 2,
        });
        return;
      }
      navigate(`/add-order/${id}`);
    },
    [navigate]
  );

  const handleStatusChange = useCallback(
    (id: string, prevStatus: OrderStatusEnum) => {
      if (prevStatus !== OrderStatusEnum.COMPLETED) {
        dispatch(() =>
          updateOrderStatus(id, {
            status: changerStatus(prevStatus),
          })
        );
        window.location.reload();
      }
    },
    [dispatch]
  );

  const handleDeleteClick = useCallback(
    (id: string, status: OrderStatusEnum) => {
      if (status === OrderStatusEnum.IN_PROGRESS) {
        setModalState({
          orderId: '',
          title: 'Wow',
          message: 'No se puede eliminar una orden en progreso',
          open: true,
          variant: 2,
        });
        return;
      }
      setModalState({
        orderId: id,
        title: 'Confirmar Eliminación',
        message:
          '¿Estás seguro de que deseas eliminar este pedido? Esta acción no se puede deshacer.',
        open: true,
      });
    },
    []
  );

  const handleConfirmDelete = useCallback(() => {
    if (!modalState || modalState.variant) {
      setModalState(null);
      return;
    }
    const { orderId } = modalState;
    dispatch(() => deleteOrder(orderId));
    window.location.reload();
  }, [modalState, dispatch]);

  const filteredOrders = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return orders.filter(
      order =>
        order.orderNumber.toLowerCase().includes(term) ||
        order.status.toLowerCase().includes(term)
    );
  }, [orders, searchTerm]);

  const handleSearch = useCallback((value: string) => setSearchTerm(value), []);

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

      <Box sx={{ mb: 3 }}>
        <SearchBox setSearch={handleSearch} />
      </Box>

      {status === 'loading' && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {status === 'succeeded' && (
        <OrdersDataGrid
          rows={filteredOrders}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          onChangeStatus={handleStatusChange}
        />
      )}

      <ConfirmationModal
        open={modalState?.open}
        onClose={() => setModalState(null)}
        onConfirm={handleConfirmDelete}
        title={modalState?.title ?? ''}
        message={modalState?.message ?? ''}
        variant={modalState?.variant}
      />
    </>
  );
};

export default MyOrdersPage;
