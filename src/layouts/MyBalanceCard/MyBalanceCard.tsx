import {ThreeDots} from '@assets/svg/icons';
import colors from '@theme/colors';
import {HStack, Pressable, Text, VStack} from 'native-base';
import React from 'react';
import {IMyBalanceCard} from './MyBalanceCard.types';

export default function MyBalanceCard({
  balanceType,
  amount,
  ...rest
}: IMyBalanceCard) {
  return (
    <VStack bg="#ffffff" p="16px" borderRadius="8px" space="2">
      <HStack justifyContent="space-between" alignItems="center">
        <Text color={colors.gray[0]}>{balanceType}</Text>
        <Pressable {...rest} p="1">
          <ThreeDots />
        </Pressable>
      </HStack>
      <Text color={colors.black} variant="h1">
        {amount}
      </Text>
    </VStack>
  );
}
