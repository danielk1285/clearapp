import {VStackProps} from '@typedef/native-base.types';
import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type IKeyBoardVStack = React.ComponentProps<typeof KeyboardAwareScrollView>;

export interface IKeyBoardVStackProps extends IKeyBoardVStack {
  rest?: any;
  containerStyle?: VStackProps;
  hideContainer?: boolean;
  children?: React.ReactNode;
}
