import { lazy } from 'react';

const Dashboard = lazy(() => import('@/modules/dashboard/views'));

const dashboardRoutes = [{ path: '/dashboard', component: Dashboard, isPrivate: false }];

export default dashboardRoutes;
