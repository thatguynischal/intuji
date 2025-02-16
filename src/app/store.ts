import { configureStore } from '@reduxjs/toolkit';
import playerSlice from '@/services/features/playerSlice';
import teamSlice from '@/services/features/teamSlice';
import { catsApi } from '@/services/api/catsApi';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, playerSlice);
const persistedTeamReducer = persistReducer(persistConfig, teamSlice);

export const store = configureStore({
  reducer: {
    player: persistedReducer,
    team: persistedTeamReducer,
    [catsApi.reducerPath]: catsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(catsApi.middleware),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
