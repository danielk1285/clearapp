import {ArrowIcon} from '@assets/svg/icons';
import CardInfo from '@layouts/CardInfo/CardInfo';
import colors from '@theme/colors';
import {Text, VStack} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {IProvideTransferCard} from './ProvideTransferCard.types';

export default function ProvideTransferIndividualCard({
  data,
  isLast,
}: IProvideTransferCard) {
  return (
    <VStack justifyContent={'center'} alignItems="center" space="4">
      <VStack alignItems="center" space={2}>
        <CardInfo icon={data.logo} />
        <VStack space={1} maxW="70%">
          <Text
            color={colors.gray[0]}
            fontWeight={500}
            fontSize="md"
            textAlign="center">
            {data.title}
          </Text>
          <Text color={colors.gray[1]} fontSize="xs" fontWeight={400}>
            {data.subTitle}
          </Text>
        </VStack>
      </VStack>
      {!isLast ? <ArrowIcon style={styles.arrowIcon} /> : null}
    </VStack>
  );
}

const styles = StyleSheet.create({
  arrowIcon: {},
});
