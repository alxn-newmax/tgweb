import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from '../../components/Sidebar';

const LoadingSpinner = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <Outlet />
    </Box>
  );
};

export default LoadingSpinner;
