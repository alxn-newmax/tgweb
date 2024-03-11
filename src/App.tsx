import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';

import LoadingSpinner from './components/UI/LoadingSpinner';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));
const DataLayout = lazy(() => import('./layout/DataLayout'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));
const BlankPage = lazy(() => import('./pages/Blank'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const CampaingsPage = lazy(() => import('./pages/Campaings'));
const WarehousePage = lazy(() => import('./pages/WarehousePage'));
const NomenclaturePage = lazy(() => import('./pages/NomenclaturePage'));
const PlansAdvertPage = lazy(() => import('./pages/PlansAdvertPage'));
const PlansSalesPage = lazy(() => import('./pages/PlansSalesPage'));

// user = {
//   id: '1',
//   name: 'robin',
//   permissions: ['analyze'],
//   roles: ['admin'],
// }

const ProtectedRoute = ({
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

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<ProtectedRoute isAllowed={true && ['admin'].includes('admin')} redirectPath="/login" />}>
            <Route path="/" element={<DefaultLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="/finance" element={<BlankPage />} />
              <Route path="/analytics" element={<BlankPage />} />
              <Route path="/orders" element={<BlankPage />} />
              <Route path="/deliveries" element={<BlankPage />} />
              <Route path="/data" element={<DataLayout />}>
                {/* <Route index element={<BlankPage />} /> */}
                <Route index path="nomenclature" element={<NomenclaturePage />} />
                <Route path="campaings" element={<CampaingsPage />} />
                <Route path="plans/sales" element={<PlansSalesPage />} />
                <Route path="plans/advert" element={<PlansAdvertPage />} />
                <Route path="warehouse" element={<WarehousePage />} />
              </Route>
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
