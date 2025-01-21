import { configureStore } from '@reduxjs/toolkit';
import authSlice from '@/services/features/authSlice';
import { catsApi } from '@/services/api/catsApi';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [catsApi.reducerPath]: catsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(catsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
