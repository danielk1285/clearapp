import { VStack } from 'native-base';
import React from 'react';
import { IContainerProps } from './Container.types';

export default function Container({ children, ...rest }: IContainerProps) {
  return (
    <VStack flex="1" {...rest}>
      {children}
    </VStack>
  );
}
