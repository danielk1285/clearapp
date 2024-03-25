import colors from '@theme/colors';
import {TextProps} from '@typedef/native-base.types';
import {Text} from 'native-base';
import React from 'react';

export const H2 = (props: TextProps) => (
  <Text color={colors.black} fontSize="lg" fontWeight={700} {...props}>
    {props.children}
  </Text>
);
