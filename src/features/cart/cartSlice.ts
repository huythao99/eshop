import {createSlice} from '@reduxjs/toolkit';

// Define a type for the slice state
interface Item {
  pid: string;
  name: string;
  price: number;
  image: string;
  qty: number;
}

interface AuthState {
  items: Array<Item>;
}

// Define the initial state using that type
const initialState: AuthState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const index = state.items.findIndex(
        item => item.pid === action.payload.item.pid,
      );
      if (index === -1) {
        state.items.push({
          ...action.payload.item,
          qty: 1,
        });
      } else {
        state.items[index].qty++;
      }
    },
    removeItem: (state, action) => {
      const index = state.items.findIndex(
        item => item.pid === action.payload.pid,
      );
      state.items.splice(index, 1);
    },
  },
});

export const {addToCart, removeItem} = cartSlice.actions;

export default cartSlice.reducer;
