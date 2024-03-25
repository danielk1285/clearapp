import { PressableProps } from '@typedef/native-base.types';
export interface IMyBalanceCard extends PressableProps {
    balanceType: string;
    amount: string;
}