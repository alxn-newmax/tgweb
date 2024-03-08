import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from '../../components/Sidebar';

const LoadingSpinner = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Outlet />
    </Box>
  );
};

export default LoadingSpinner;
