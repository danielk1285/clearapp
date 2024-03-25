import { PressableProps } from '@typedef/native-base.types';
export interface ITransferAccountCard extends PressableProps {
    transferAccountItem: {
        id: number;
        name: string;
        amount: string;
        date: string | Date;
        currency: string;
    }
}