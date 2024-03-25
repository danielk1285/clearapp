import {PressableProps} from '@typedef/native-base.types';

export interface ISelectCurrencyBtnProps extends PressableProps {
  onPress?: () => void;
  currency: string;
  flag: string;
}
