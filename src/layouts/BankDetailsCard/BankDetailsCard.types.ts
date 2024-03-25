import {PressableProps} from '@types/native-base.types';

export interface IBankDetailsCard extends PressableProps {
  bankName: string;
  address: string;
  accountNumber: string;
  branch: string;
  routingNumber: string;
}

export interface IBankDetailsCardItem extends PressableProps {
  itemKey: string;
  value: string;
  isShareable?: boolean;
}
