import { NavOption } from '../schemas/NavOption';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

interface Props {
  options: NavOption[];
}

const NavBar = ({ options }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={1}
      sx={{
        backgroundColor: theme => theme.palette.background.paper,
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        py: 1,
        marginBottom: 2,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h3"
          sx={{ color: 'primary.main', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Tech Test Fractal
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {options.map(option => (
            <Button
              key={option.path}
              onClick={() => navigate(option.path)}
              variant="text"
              color="primary"
              sx={{
                fontWeight: 500,
                borderBottom:
                  location.pathname === option.path ? '2px solid' : 'none',
                borderColor: 'primary.main',
                borderRadius: 0,
              }}
            >
              {option.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
