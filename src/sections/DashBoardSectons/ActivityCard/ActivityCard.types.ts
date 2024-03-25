import {PressableProps} from '@typedef/native-base.types';
export interface IActivityCard extends PressableProps {
  title?: string;
  activityList: IActivity[];
  numberOfActivity?: number;
}

export interface IActivity extends PressableProps {
  id: string;
  status: string;
  icon: string;
  date: Date | string;
  amount: string;
}

export interface IActivityCardItem extends PressableProps {
  activity: IActivity;
}
