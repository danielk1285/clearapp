import {PressableProps} from '@typedef/native-base.types';

export interface IAccountItem extends PressableProps {
  data: IAccountData;
  isSelected: boolean;
}

export interface IAccountData {
  id: number;
  title: string;
  amount: string;
  date: Date | string;
}
