import {InputProps, VStackProps} from '@typedef/native-base.types';

export interface ICurrencyExchangeCardProps extends VStackProps {
  title?: string;
  subTitle?: string;
  handleCurrency: (value: any) => void;
  inputProps?: InputProps;
  error?: string;
  touched?: boolean;
  onChangeText?: (value: string) => void;
  value?: string;
  onBlur?: (value: string) => void;
  onPress?: () => void;
  currency: string;
  flag: string;
  currencySymbol: string;
}
