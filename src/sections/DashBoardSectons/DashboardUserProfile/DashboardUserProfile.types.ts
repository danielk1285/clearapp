import {PressableProps} from '@typedef/native-base.types';
export interface IHomeProfile extends PressableProps {
  name: string;
  balance: number;
  onAddBalance: () => void;
  userAvatar: string;
}
