import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '@store/index';

const initialState = {
  numberOfExpands: 0,
  hasViewedOnboarding: false,
  hasViewedTutorials: false,
  hasExpandedExchange: true,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    incrementNumberOfExpands(state) {
      state.numberOfExpands++;
    },
    decrementNumberOfExpands(state) {
      state.numberOfExpands--;
    },
    setHasViewedOnboarding(state, action) {
      state.hasViewedOnboarding = action.payload;
    },
    setHasViewedTutorials(state, action) {
      state.hasViewedTutorials = action.payload;
    },

    setHasExpandedExchange(state, action) {
      state.hasExpandedExchange = action.payload;
    },
  },
});

export const {
  incrementNumberOfExpands,
  decrementNumberOfExpands,
  setHasViewedTutorials,
  setHasViewedOnboarding,
  setHasExpandedExchange,
} = uiSlice.actions;

export const selectNumberOfExpands = (state: RootState) =>
  state.ui.numberOfExpands;
export const selectHasViewedOnboarding = (state: RootState) =>
  state.ui.hasViewedOnboarding;
export const selectHasViewedTutorials = (state: RootState) =>
  state.ui.hasViewedTutorials;
export const selectHasExpandedExchange = (state: RootState) =>
  state.ui.hasExpandedExchange;

const uiReducer = uiSlice.reducer;

export default uiReducer;
