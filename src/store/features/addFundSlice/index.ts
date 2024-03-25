import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IAddFundState} from './types';
import {ICurrencyValue} from '@typedef/common.types';
import {RootState} from '@store/index';

const initialState: IAddFundState = {
  fromCurrency: undefined,
  toCurrency: undefined,
  fromAmount: 0,
  toAmount: 0,
};

const addFundSlice = createSlice({
  name: 'addFund',
  initialState,
  reducers: {
    setFromCurrency(state: RootState, action: PayloadAction<ICurrencyValue>) {
      state.fromCurrency = action.payload;
    },
    setToCurrency(state: RootState, action: PayloadAction<ICurrencyValue>) {
      state.toCurrency = action.payload;
    },

    setFromAmount(state: RootState, action: PayloadAction<number>) {
      state.fromAmount = action.payload;
    },

    setToAmount(state: RootState, action: PayloadAction<number>) {
      state.toAmount = action.payload;
    },
  },
});

export const {setFromCurrency, setToCurrency, setFromAmount, setToAmount} =
  addFundSlice.actions;

export const selectFromCurrency = (state: RootState) =>
  state.addFund.fromCurrency;
export const selectToCurrency = (state: RootState) => state.addFund.toCurrency;
export const selectFromAmount = (state: RootState) => state.addFund.fromAmount;
export const selectToAmount = (state: RootState) => state.addFund.toAmount;

const addFundReducer = addFundSlice.reducer;

export default addFundReducer;
