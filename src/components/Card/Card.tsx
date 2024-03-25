import {VStackProps} from '@typedef/native-base.types';
import {VStack} from 'native-base';
import React from 'react';

interface CardProps extends VStackProps {
  children: React.ReactNode;
}

export default function Card({children, ...rest}: CardProps) {
  return (
    <VStack bg="white" p="4" borderRadius="10px" {...rest}>
      {children}
    </VStack>
  );
}
