import colors from '@theme/colors';
import moment from 'moment';
import {HStack, Pressable, Text} from 'native-base';
import React from 'react';
import {ITransferAccountCard} from './TransferAccountCard.types';

export default function TransferAccountCard({
  transferAccountItem,
  ...rest
}: ITransferAccountCard) {
  console.log('transferAccountItem', transferAccountItem);
  return (
    <Pressable bg={colors.bg} mb="10px" p="12px" borderRadius="8px" {...rest}>
      <Text color={colors.black} fontWeight={700} fontSize="md">
        {transferAccountItem.name || transferAccountItem.nickname}
      </Text>
      <HStack justifyContent="space-between" mt="5px" mb="2px">
        <Text fontSize="sm" color={colors.gray[0]}>
          Last transection amount
        </Text>
        <Text fontSize="sm" color={colors.gray[0]}>
          {transferAccountItem.amount}
        </Text>
      </HStack>
      <HStack justifyContent="space-between">
        <Text fontSize="sm" color={colors.gray[0]}>
          Transaction date
        </Text>
        <Text fontSize="sm" color={colors.gray[0]}>
          {moment(transferAccountItem.date).format('ll')}
        </Text>
      </HStack>
    </Pressable>
  );
}
