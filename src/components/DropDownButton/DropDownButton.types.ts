import React from 'react';
import {PressableProps} from '@typedef/native-base.types';
import {Text} from 'native-base';

export interface IDropDownButton extends PressableProps {
  value?: string;
  title: string;
  placeholder: string;
  icon?: JSX.Element;
  error?: string;
  touched?: boolean;
  textProps?: React.ComponentProps<typeof Text>;
}
