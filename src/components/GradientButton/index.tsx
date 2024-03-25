import {LinGrad} from '@components/FactoryComponents/FactoryComponents';
import {gradient} from '@theme/colors';
import {PressableProps, TextProps} from '@typedef/native-base.types';
import {Pressable, Text} from 'native-base';
import React from 'react';

interface IGradientButton extends PressableProps {
  children: string;
  textProps?: TextProps;
}

export default function GradientButton({
  textProps,
  children,
  ...rest
}: IGradientButton) {
  return (
    <Pressable
      w="full"
      justifyContent={'center'}
      alignItems="center"
      _pressed={{opacity: 0.5}}
      h={'50px'}
      borderRadius={8}
      overflow={'hidden'}
      {...rest}>
      <LinGrad
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={gradient.upper}
        h={'100%'}
        w={'full'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}>
        <Text
          color="#ffffff"
          fontFamily={'body'}
          fontSize="md"
          fontWeight="bold"
          {...textProps}>
          {children}
        </Text>
      </LinGrad>
    </Pressable>
  );
}
