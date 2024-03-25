import { PressableProps } from '@typedef/native-base.types';
export interface IExchangeOptionCard extends PressableProps {
    exchangeOptionItem: {
        id: number;
        title: string;
        option: string;
    }
    isSelected: number;
}