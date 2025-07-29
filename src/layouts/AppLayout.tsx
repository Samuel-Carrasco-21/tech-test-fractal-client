import { Box } from '@mui/material';
import NavBar from '../components/NavBar';
import { navOptions } from '../data/navOptions';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <NavBar options={navOptions} />
      <Outlet />
    </Box>
  );
};

export default AppLayout;
