import { Box, Grid, TextField } from '@mui/material';

interface Props {
  orderNumber: string;
  onOrderNumberChange: (value: string) => void;
  date: string;
  productCount: number;
  finalPrice: number;
  isEditMode: boolean;
}

const OrderForm = ({
  orderNumber,
  onOrderNumberChange,
  date,
  productCount,
  finalPrice,
}: Props) => {
  return (
    <Box component="form" noValidate autoComplete="off" sx={{ mb: 4 }}>
      <Grid container spacing={2}>
        <Grid>
          <TextField
            label="Número de Pedido (#)"
            value={orderNumber}
            onChange={e => onOrderNumberChange(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid>
          <TextField label="Fecha" value={date} fullWidth disabled />
        </Grid>
        <Grid>
          <TextField
            label="# Productos"
            value={productCount}
            fullWidth
            disabled
          />
        </Grid>
        <Grid>
          <TextField
            label="Precio Final"
            value={`$${finalPrice.toFixed(2)}`}
            fullWidth
            disabled
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderForm;
