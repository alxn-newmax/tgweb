import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = ({
  isAllowed,
  redirectPath = '/',
  children,
}: {
  isAllowed: boolean;
  redirectPath?: string;
  children?: React.ReactElement;
}) => {
  if (!isAllowed) return <Navigate to={redirectPath} replace />;
  return children ? children : <Outlet />;
};
