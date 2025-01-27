import { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import dashboardRoutes from '@/modules/dashboard/router';
import PrivateRoute from './PrivateRoute';
import NoPage from '@/views/PageNotFound'; // Shared 404 page
import { useAppSelector } from '@/app/hooks';
import { RootState } from '@/app/store';

export default function AppRoutes() {
  const isAuthenticated = useAppSelector((state: RootState) => Boolean(state?.auth?.token));

  // Combine all routes
  const allRoutes = [...dashboardRoutes];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {allRoutes.map(({ path, component: Component, isPrivate }) => {
          if (isPrivate) {
            return (
              <Route
                key={path}
                path={path}
                element={
                  <PrivateRoute>
                    <Component />
                  </PrivateRoute>
                }
              />
            );
          }

          if (isAuthenticated && ['/login', '/'].includes(path)) {
            return <Route key={path} path={path} element={<Navigate to="/dashboard" />} />;
          }

          return <Route key={path} path={path} element={<Component />} />;
        })}
        <Route path="/dashboard" element={<NoPage />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Suspense>
  );
}
