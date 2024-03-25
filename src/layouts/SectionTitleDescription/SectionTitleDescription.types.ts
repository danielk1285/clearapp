import {TextProps} from '@typedef/native-base.types';

export interface ISectionTitleDescriptionProps {
  title: string;
  rightText?: string;
  onRightTextPress?: () => void;
  titleProps?: TextProps;
  rightTextProps?: TextProps;
}
