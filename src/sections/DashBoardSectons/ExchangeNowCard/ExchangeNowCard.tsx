import dashboardCardInfos from '@appData/dashBoardCardInfos';
import Card from '@components/Card/Card';
import SectionTitleDescription from '@layouts/SectionTitleDescription/SectionTitleDescription';
import { HStack, Text } from 'native-base';
import React from 'react';
import ExchangeInfoCard from './ExchangeInfoCard';
import colors from '@theme/colors';

export default function ExchangeNowCard({ title }: { title: string }) {
  const cardsToShow = dashboardCardInfos.map(cardInfo => (
    <ExchangeInfoCard
      key={cardInfo.icon}
      title={cardInfo.title}
      icon={cardInfo.icon}
    />
  ));

  return (
    <Card>
      <SectionTitleDescription title={title} />
      <HStack justifyContent="space-between" my="20px">
        {cardsToShow}
      </HStack>

      <Text fontSize="xs" fontWeight={500} color={colors.gray[0]}>
        * Estimates are based on completed exchanges from the{' '}
        <Text color={'#C1121F'} fontWeight={600}>
          past 24 hours
        </Text>
      </Text>
    </Card>
  );
}
