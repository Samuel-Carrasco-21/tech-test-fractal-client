import { useState } from 'react';
import {
  Autocomplete,
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
  products: IProductResponse[];
  onClose: () => void;
  onAddProduct: (product: IProductResponse, quantity: number) => void;
}

const AddProductModal = ({ open, products, onClose, onAddProduct }: Props) => {
  const [selectedProduct, setSelectedProduct] =
    useState<IProductResponse | null>(null);
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    if (selectedProduct && quantity > 0) {
      onAddProduct(selectedProduct, quantity);
      handleClose();
    }
  };

  const handleClose = () => {
    setSelectedProduct(null);
    setQuantity(1);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <Box sx={{ backgroundColor: 'white' }}>
        <DialogTitle>Añadir Producto al Pedido</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid width={250}>
              <Autocomplete
                options={products}
                getOptionLabel={option => option.name}
                value={selectedProduct}
                onChange={(_, newValue) => setSelectedProduct(newValue)}
                renderInput={params => (
                  <TextField {...params} label="Seleccionar Producto" />
                )}
              />
            </Grid>
            <Grid>
              <TextField
                label="Cantidad"
                type="number"
                value={quantity}
                onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
                fullWidth
                InputProps={{ inputProps: { min: 1 } }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            onClick={handleAdd}
            variant="contained"
            disabled={!selectedProduct}
          >
            Confirmar y Guardar
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AddProductModal;
