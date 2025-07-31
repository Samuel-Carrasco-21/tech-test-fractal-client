import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import SearchBox from '@/components/SearchBox';
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

  const products = useAppSelector(selectAllProducts);
  const status = useAppSelector(selectProductsStatus);

  const [formModalOpen, setFormModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<IProductResponse | null>(
    null
  );
  const [deleteModal, setDeleteModal] = useState({ open: false, id: '' });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // --- Handlers memoizados ---
  const handleOpenAddModal = useCallback(() => {
    setProductToEdit(null);
    setFormModalOpen(true);
  }, []);

  const handleOpenEditModal = useCallback((product: IProductResponse) => {
    setProductToEdit(product);
    setFormModalOpen(true);
  }, []);

  const handleSave = useCallback(
    (data: { name: string; unitPrice: number }) => {
      if (productToEdit) {
        dispatch(() => updateProduct(productToEdit.id, { ...data }));
      } else {
        dispatch(addNewProduct(data));
      }
      window.location.reload();
    },
    [dispatch, productToEdit]
  );

  const handleDeleteClick = useCallback((id: string) => {
    setDeleteModal({ open: true, id });
  }, []);

  const handleConfirmDelete = useCallback(() => {
    dispatch(() => deleteProduct(deleteModal.id));
    setDeleteModal({ open: false, id: '' });
    window.location.reload();
  }, [deleteModal.id, dispatch]);

  const filteredProducts = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(term)
    );
  }, [products, searchTerm]);

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

      <Box sx={{ mb: 3 }}>
        <SearchBox setSearch={handleSearch} placeholder="Buscar producto..." />
      </Box>

      {status === 'loading' && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {status === 'succeeded' && (
        <ProductsDataGrid
          rows={filteredProducts}
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
