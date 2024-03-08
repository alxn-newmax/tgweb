import { Link, Outlet, useLocation } from 'react-router-dom';
import { Box, Tab, Tabs } from '@mui/material';

export default function DataLayout() {
  const location = useLocation();
  const currentTab = location.pathname;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: '30px', width: '100%', height: '100vh' }}>
      <h1>Данные</h1>
      <Box sx={{ width: '100%', m: '20px 0', bgcolor: 'background.paper' }}>
        <Tabs value={currentTab} centered>
          <Tab label="Номеклатура" value={'/data/nomenclature'} component={Link} to={'/data/nomenclature'} />
          <Tab label="Компании" value={'/data/campaings'} component={Link} to={'/data/campaings'} />
          <Tab label="План продаж" value={'/data/plans/sales'} component={Link} to={'/data/plans/sales'} />
          <Tab label="План рекламы" value={'/data/plans/advert'} component={Link} to={'/data/plans/advert'} />
          <Tab label="Склады" value={'/data/warehouse'} component={Link} to={'/data/warehouse'} />
        </Tabs>
      </Box>
      <Outlet />
    </Box>
  );
}
