import {ICurrencyValue} from '@typedef/common.types';

export interface IAddFundState {
  fromCurrency?: ICurrencyValue;
  toCurrency?: ICurrencyValue;
  fromAmount?: number;
  toAmount?: number;
}
