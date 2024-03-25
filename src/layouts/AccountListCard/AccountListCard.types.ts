import {IBankAccountData} from '@typedef/common.types';

export interface IAccountListCard {
  title: string;
  subTitle: string;
  accountList: IBankAccountData[];
  onAddAccount: () => void;
  onAccountPress: (item: IBankAccountData) => void;
  selectedAccount?: IBankAccountData;
  children?: React.ReactNode;
}

export interface IAccountListCardItem {
  id: number;
  name: string;
  accountName: string;
  date: string | Date;
}
