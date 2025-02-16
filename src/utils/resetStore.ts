import { store } from '@/app/store';
import { resetPlayers } from '@/services/features/playerSlice';
import { removeTeam } from '@/services/features/teamSlice';

export const resetAllSlices = () => {
  const sliceResetActions = [
    resetPlayers(),
    removeTeam({ id: 1 }),  // This will trigger a reset of teams
    removeTeam({ id: 2 }),
    // Add other slice reset actions
  ];

  sliceResetActions.forEach(store.dispatch);
};