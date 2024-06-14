import './i18n';
import React, { Suspense, useContext, lazy, useCallback, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { WebApp } from '@grammyjs/web-app';

import { Box } from '@mui/material';
import LoadingSpinner from './components/UI/LoadingSpinner';

import WebAppContext from 'store/webAppContext';
import { ProtectedRoute } from 'routes/protectedRoute';
import { ordersSelector } from 'reducers/ordersReducer';

const NotFound = lazy(() => import('./pages/NotFound'));
const OrdersListPage = lazy(() => import('./pages/OrdersListPage'));
const OrdersInfoPage = lazy(() => import('./pages/OrdersInfoPage'));
const OrderMessagesPage = lazy(() => import('./pages/OrdersMessagesPage'));

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const webApp = useContext(WebAppContext);
  const { list } = useSelector(ordersSelector);

  const isAuth = Boolean(webApp.user);

  const onBackClick = useCallback(() => {
    const isOrderChat = location.pathname.endsWith('chat');
    console.log(isOrderChat, location.pathname);
    if (!list.length || !isOrderChat) WebApp.BackButton.hide();
    navigate(-1);
  }, [list.length, location, navigate]);

  useEffect(() => {
    WebApp.ready();
    WebApp.expand();
    WebApp.BackButton.onClick(onBackClick);
    return () => {
      WebApp.BackButton.offClick(onBackClick);
    };
  }, [onBackClick]);

  const Loading = () => (
    <Box sx={{ height: 'var(--tg-viewport-stable-height)', width: '100vw' }}>
      <LoadingSpinner />
    </Box>
  );

  if (!webApp.verified) return <Loading />;

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<NotFound />} />
        <Route element={<ProtectedRoute isAllowed={isAuth} redirectPath="/" />}>
          <Route path="/orders" element={<OrdersListPage />} />
          <Route path="/orders/:order_key" element={<OrdersInfoPage />} />
          <Route path="/orders/:order_key/chat" element={<OrderMessagesPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
