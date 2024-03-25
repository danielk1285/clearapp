import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

export type VIcon = React.ComponentProps<typeof Icon>;

interface IConversionRate {
  [key: string]: number | string;
}

export interface ICurrencyValue {
  currencyCode: string;
  currencyName: string;
  currencySymbol: string;
  flag: string;
  conversionRates: IConversionRate;
  updatedDate: Date;
  decimalDigits: number;
}

export interface IWalletData {
  id: string;
  currency: string;
  symbol: string;
  amount: string;
}

export interface IBankAccountData {
  accountCurrency: string;
  accountNumber: string;
  bankAddress: string;
  bankCountry: string;
  bankName: string;
  branchNumber: string;
  iban: string;
  id: string;
  nickname: string;
  preferredCurrency: string;
  routingNumber: string;
  swift: string;
  userVerificationCred: {Time: string; IP: string};
  verificationImageLink: string;
  verificationStatus: 'Pending' | 'Done' | 'Rejected';
}

export type ITransectionNavigationParams = 'addFunds' | 'startExchange';

export interface ITransectionData {
  fromCurrency: ICurrencyValue;
  fromAmount: number;
  type: ITransectionNavigationParams;
  toCurrency?: ICurrencyValue;
  toAmount: number;
  conversionRate: number;
}

export interface ITransectionDataWithBank extends ITransectionData {
  bankAccount: IBankAccountData;
}

export interface IAddFunds {
  userId: string;
  currency: 'GBP' | 'ILS' | 'USD' | 'EURO';
  amountToSend?: number;
  action: 'Transfer';
  sendingBankRef?: string;
  verificationImageLink?: string;
}

export interface IExchangeRequest {
  currencyTo: 'GBP' | 'ILS' | 'USD' | 'EURO';
  currencyFrom: 'GBP' | 'ILS' | 'USD' | 'EURO';
  amountToSend: number;
  amountConverted: number;
  amountReceived: number;
  action?: 'Exchange';
  askedExchangeType?: 'Spot' | 'Community';
  userId?: string;
  conversionRate: number;
}
export interface IWithdrawRequest {
  userId: string;
  sendingWalletRef?: string;
  receivingWalletRef?: string;
  sendingBankRef: string;
  receivingBankRef?: string;
  amountToSend?: number;
  action: 'Withdrawal';
}
