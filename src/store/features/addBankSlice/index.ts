import {createSlice} from '@reduxjs/toolkit';
import {IBankAccount} from '@store/apis/bankAccounntsApi/types';
import {RootState} from '@store/index';

const initialValues: IBankAccount = {
  accountCurrency: '',
  accountNumber: '',
  bankAddress: '',
  bankCountry: '',
  bankName: '',
  branchNumber: '',
  iban: '',
  nickname: '',
  preferredCurrency: '',
  routingNumber: '',
  swift: '',
  verificationImageLink: '',
};

const addBankSlice = createSlice({
  name: 'addBank',
  initialState: initialValues,
  reducers: {
    updateAddBank: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const {updateAddBank} = addBankSlice.actions;
export const selectAddBank = (state: RootState) => state.addBank;

const addBankReducer = addBankSlice.reducer;

export default addBankReducer;
