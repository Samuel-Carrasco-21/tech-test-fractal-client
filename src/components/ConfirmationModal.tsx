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
  open?: boolean;
  onClose?: VoidFunction;
  onConfirm: VoidFunction;
  title: string;
  message: string;
  variant?: 1 | 2;
}

const ConfirmationModal = ({
  open = false,
  onClose,
  onConfirm,
  title,
  message,
  variant = 1,
}: Props) => {
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <Box sx={{ backgroundColor: 'white' }}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{message}</DialogContentText>
          </DialogContent>
          <DialogActions>
            {variant === 1 && onClose && (
              <Button onClick={onClose} color="secondary">
                Cancelar
              </Button>
            )}
            <Button
              onClick={onConfirm}
              color="primary"
              variant="contained"
              autoFocus
            >
              {variant === 1 ? 'Confirmar' : 'Ok'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default ConfirmationModal;
