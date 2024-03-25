import {IWalletData} from '@typedef/common.types';
import {IActionsheetProps} from 'native-base';

export interface IActionsheetModal extends IActionsheetProps {
  children: React.ReactNode;
}

export interface IActionsheetItem {
  actionList: {
    id: number;
    icon: string;
    title: string;
  }[];
  currency: string;
  selectedWallet: IWalletData;
}
