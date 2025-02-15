import { lazy } from 'react';

const PlayerView = lazy(() => import('@/modules/player/views/Index'));

const playerRoutes = [{ path: '/player', component: PlayerView, isPrivate: false }];

export default playerRoutes;
