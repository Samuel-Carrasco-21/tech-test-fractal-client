import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material';
import { IProductResponse } from '@/schemas/products';

interface Props {
  open: boolean;
  productToEdit?: IProductResponse | null;
  onClose: () => void;
  onSave: (data: { name: string; unitPrice: number }) => void;
}

const ProductFormModal = ({ open, productToEdit, onClose, onSave }: Props) => {
  const [name, setName] = useState('');
  const [unitPrice, setUnitPrice] = useState(0);

  const isEditMode = !!productToEdit;

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setUnitPrice(productToEdit.unitPrice);
    } else {
      // Reset form for "Add" mode
      setName('');
      setUnitPrice(0);
    }
  }, [productToEdit, open]);

  const handleSave = () => {
    if (name && unitPrice > 0) {
      onSave({ name, unitPrice });
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Box sx={{ backgroundColor: 'white' }}>
        <DialogTitle>
          {isEditMode ? 'Editar Producto' : 'Añadir Nuevo Producto'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid sx={{ width: '100%' }}>
              <TextField
                label="Nombre del Producto"
                value={name}
                onChange={e => setName(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid sx={{ width: '100%' }}>
              <TextField
                label="Precio Unitario"
                type="number"
                value={unitPrice}
                onChange={e =>
                  setUnitPrice(Math.max(0, Number(e.target.value)))
                }
                fullWidth
                required
                InputProps={{ inputProps: { min: 0, step: '0.01' } }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={!name || unitPrice <= 0}
          >
            {isEditMode ? 'Guardar Cambios' : 'Crear Producto'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ProductFormModal;
