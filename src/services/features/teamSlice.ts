import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Team } from '@/utils/globalTypes';

const initialState = {
  teams: [] as Team[], 
};

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    addTeam(state, action: PayloadAction<{ name: string }>) {
      state.teams.push({ id: state.teams.length + 1, name: action.payload.name, players: [] });
    },
    updateTeam(state, action: PayloadAction<{ id: number; name: string }>) {
      state.teams = state.teams.map((team) => (team.id === action.payload.id ? { ...team, name: action.payload.name } : team));
    },
    removeTeam(state, action: PayloadAction<{ id: number }>) {
      state.teams = state.teams.filter((team) => team.id !== action.payload.id);
    },
  },
});

export const { addTeam, updateTeam, removeTeam } = teamSlice.actions;
export default teamSlice.reducer;