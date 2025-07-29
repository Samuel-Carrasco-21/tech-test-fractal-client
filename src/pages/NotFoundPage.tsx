import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundColor: theme => theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 3,
      }}
    >
      <Typography variant="h1" color="primary" gutterBottom>
        404
      </Typography>
      <Typography variant="h2" color="text.primary" gutterBottom>
        Página no encontrada
      </Typography>
      <Typography variant="body1" color="text.primary" sx={{ mb: 4 }}>
        Lo sentimos, la página que buscas no existe o fue movida.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        Volver al inicio
      </Button>
    </Box>
  );
};

export default NotFoundPage;
