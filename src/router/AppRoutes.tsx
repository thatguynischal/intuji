import { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import dashboardRoutes from '@/modules/dashboard/router';
import PrivateRoute from './PrivateRoute';
import NoPage from '@/views/PageNotFound';
import { useAppSelector } from '@/app/hooks';
import { RootState } from '@/app/store';
import SharedResults from '../../public/Sharable';

interface RouteConfig {
  path: string;
  component: React.ComponentType;
  isPrivate: boolean;
}

export default function AppRoutes() {
  // @ts-expect-error
  const isAuthenticated = useAppSelector((state: RootState) => Boolean(state?.auth?.token));
  const allRoutes: RouteConfig[] = [...dashboardRoutes];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public landing page */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/dashboard" replace />}
        />

        {/* Map all defined routes */}
        {allRoutes.map(({ path, component: Component, isPrivate }) => (
          <Route
            key={path}
            path={path}
            element={
              isPrivate ? (
                <PrivateRoute>
                  <Component />
                </PrivateRoute>
              ) : (
                <Component />
              )
            }
          />
        ))}

        {/* New public route for shared results */}
        <Route path="/shared-results/:encodedTeams" element={<SharedResults />} />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Suspense>
  );
}
