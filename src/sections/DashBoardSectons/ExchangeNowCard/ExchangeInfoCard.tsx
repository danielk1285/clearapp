import { Center, Text, VStack } from 'native-base';
import React from 'react';

import { ClockIcon, Dollar, SwapIcon } from '@assets/svg/icons';
import { StyleSheet } from 'react-native';
import { IExchangeInfoCardProps } from './ExchangeInfoCard.types';
import CardInfo from '@layouts/CardInfo/CardInfo';

export default function ExchangeInfoCard({
  title,
  icon = 'clock',
}: IExchangeInfoCardProps) {

  return (
    <Center>
      <CardInfo icon={icon} />
      <Text
        maxWidth={'80px'}
        textAlign={'center'}
        fontSize="xs"
        fontWeight={600}
        color="#616164">
        {title}
      </Text>
    </Center>
  );
}
