import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface Props {
  open: boolean;
  onClose: VoidFunction;
  onConfirm: VoidFunction;
  title: string;
  message: string;
}

const ConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
}: Props) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Box sx={{ backgroundColor: 'white' }}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            color="primary"
            variant="contained"
            autoFocus
          >
            Confirmar
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ConfirmationModal;
