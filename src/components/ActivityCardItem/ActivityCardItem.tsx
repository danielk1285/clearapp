import CardInfo from '@layouts/CardInfo/CardInfo';
import {HStack, Pressable, Text, VStack} from 'native-base';
import React from 'react';
import colors from '@theme/colors';
import {IActivityCardItem} from '@sections/DashBoardSectons/ActivityCard/ActivityCard.types';
import moment from 'moment';
import TransferIcon from '@assets/svg/Transfer';
import YouExchangedIcon from '@assets/svg/YouExchanged';
import WithdrawIcon from '@assets/svg/Withdraw';

export default function ActivityCardItem({
  activity,
  ...rest
}: any) {
  console.log('activity', activity);
  const icon = (() => {
    switch (activity.type) {
      case 'Transfer':
        return <TransferIcon />;
      case 'Exchange':
        return <YouExchangedIcon />;
      case 'Withdrawal':
        return <WithdrawIcon />;
      default:
        return <TransferIcon />;
    }
  })();
  return (
    <HStack
      alignItems="center"
      bg={colors.bg}
      px="10px"
      pt="16px"
      pb="8px"
      justifyContent="space-between"
      borderRadius="8px">
      <HStack alignItems="center">
        {/* <CardInfo mb="0px" icon={activity.icon} bg="#ffffff" /> */}
        {icon}
        <VStack ml="10px" space={2} pb="2px">
          <Text
            fontWeight={700}
            color={
              activity.status !== 'You Exchanged' ? colors.green : colors.black
            }>
            {activity.status}
          </Text>
          {moment(activity.date).isValid() && (
            <Text fontSize="xs" color={colors.gray[0]}>
              {moment(activity.date).fromNow()}
            </Text>
          )}
        </VStack>
      </HStack>
      <VStack space={2} pb="2px">
        <Text textAlign="right" fontWeight={700} color={colors.black}>
          {activity.amount}
        </Text>
        <Pressable {...rest}>
          <Text textAlign="right" fontSize="xs" color={colors.primary}>
            View Details
          </Text>
        </Pressable>
      </VStack>
    </HStack>
  );
}
