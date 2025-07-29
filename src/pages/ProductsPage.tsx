import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import ProductsDataGrid from '@/components/products/ProductsDataGrid';
import ProductFormModal from '@/components/products/ProductFormModal';
import ConfirmationModal from '@/components/ConfirmationModal';
import { useAppDispatch, useAppSelector } from '../hooks/useStore';
import { IProductResponse } from '../schemas/products';
import { updateProduct, deleteProduct } from '../services/products';
import {
  selectAllProducts,
  selectProductsStatus,
  fetchProducts,
  addNewProduct,
} from '../store/productsSlice';

const ProductsPage = () => {
  const dispatch = useAppDispatch();

  // State from Redux
  const products = useAppSelector(selectAllProducts);
  const status = useAppSelector(selectProductsStatus);

  // Local state for modals
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<IProductResponse | null>(
    null
  );
  const [deleteModal, setDeleteModal] = useState({ open: false, id: '' });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // --- Handlers ---
  const handleOpenAddModal = () => {
    setProductToEdit(null);
    setFormModalOpen(true);
  };

  const handleOpenEditModal = (product: IProductResponse) => {
    setProductToEdit(product);
    setFormModalOpen(true);
  };

  const handleSave = (data: { name: string; unitPrice: number }) => {
    if (productToEdit) {
      // Update existing product
      dispatch(() => updateProduct(productToEdit.id, { ...data }));
    } else {
      // Create new product
      dispatch(addNewProduct(data));
    }
    window.location.reload();
  };

  const handleDeleteClick = (id: string) => {
    setDeleteModal({ open: true, id });
  };

  const handleConfirmDelete = () => {
    dispatch(() => deleteProduct(deleteModal.id));
    setDeleteModal({ open: false, id: '' });
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
        <Typography variant="h2">Gestionar Productos</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenAddModal}
        >
          Añadir Nuevo Producto
        </Button>
      </Box>

      {status === 'loading' && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {status === 'succeeded' && (
        <ProductsDataGrid
          rows={products}
          onEdit={handleOpenEditModal}
          onDelete={handleDeleteClick}
        />
      )}

      <ProductFormModal
        open={formModalOpen}
        productToEdit={productToEdit}
        onClose={() => setFormModalOpen(false)}
        onSave={handleSave}
      />

      <ConfirmationModal
        open={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, id: '' })}
        onConfirm={handleConfirmDelete}
        title="Confirmar Eliminación de Producto"
        message="¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer."
      />
    </>
  );
};

export default ProductsPage;
