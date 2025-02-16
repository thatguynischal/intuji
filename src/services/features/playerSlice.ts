import { createSlice } from '@reduxjs/toolkit';

export interface Player {
  id: number;
  name: string;
  rating: number;
}

const initialState = {
  token: null,
  stepsCount: 0,
  players: [{
    id: 1,
    name: 'Cristiano Ronaldo',
    rating: 5
  },
  {
    id: 2,
    name: 'Lionel Messi',
    rating: 4
  }] as Player[],
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    stepsIncrement(state) {
      state.stepsCount += 1;
    },
    stepsReset(state) {
      state.stepsCount = 0;
    },
    stepsDecrement(state) {
      state.stepsCount -= 1;
    },
    addPlayer(state, action) {
      state.players.push(action.payload);
    },
    removePlayer(state, action) {
      state.players = state.players.filter((player) => player.id !== action.payload.id);
    },
    resetPlayers(state) {
      state.players = [];
    },
    updatePlayer(state, action) {
      const { id, name, rating } = action.payload;
      state.players = state.players.map((player) => (player.id === id ? { ...player, name, rating } : player));
    },
  },
});

export const { setToken, stepsIncrement, stepsReset, stepsDecrement, addPlayer, removePlayer, resetPlayers, updatePlayer } = playerSlice.actions;
export default playerSlice.reducer;
