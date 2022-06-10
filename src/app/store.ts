import {configureStore} from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import cartSlice from '../features/cart/cartSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
export type AppDispatch = typeof store.dispatch;
