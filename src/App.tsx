import React, { useContext } from 'react';
import { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import LoadingSpinner from './components/UI/LoadingSpinner';
import { ProtectedRoute } from 'routes/protectedRoute';
import WebAppContext from 'store/webAppContext';
import { Box } from '@mui/material';

const NotFound = lazy(() => import('./pages/NotFound'));
const OrdersListPage = lazy(() => import('./pages/OrdersListPage'));
const OrdersInfoPage = lazy(() => import('./pages/OrdersInfoPage'));

export default function App() {
  const webApp = useContext(WebAppContext);

  if (!webApp.isLoading) {
    return (
      <Box sx={{ height: 'var(--tg-viewport-stable-height)', width: '100vw' }}>
        <LoadingSpinner />
      </Box>
    );
  }

  const isAuth = true;
  // const isAuth = Boolean(webApp.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NotFound />} />
        <Route element={<ProtectedRoute isAllowed={isAuth} redirectPath="/" />}>
          <Route path="/orders" element={<OrdersListPage />} />
          <Route path="/orders/:order_key" element={<OrdersInfoPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
