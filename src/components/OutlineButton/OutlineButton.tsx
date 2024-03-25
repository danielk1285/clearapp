import colors from '@theme/colors';
import {PressableProps, TextProps} from '@typedef/native-base.types';
import {Pressable, Text} from 'native-base';
import React from 'react';

interface IOutlineButton extends PressableProps {
  children: string;
  textProps?: TextProps;
}

export default function OutlineButton({
  textProps,
  children,
  ...rest
}: IOutlineButton) {
  return (
    <Pressable
      w="full"
      justifyContent={'center'}
      alignItems="center"
      _pressed={{opacity: 0.5}}
      h={'50px'}
      borderRadius={8}
      overflow={'hidden'}
      bgColor="#ffffff"
      borderWidth={1}
      borderColor={colors.primary}
      {...rest}>
      <Text
        color={colors.primary}
        fontWeight={600}
        fontFamily={'body'}
        fontSize="md"
        {...textProps}>
        {children}
      </Text>
    </Pressable>
  );
}
