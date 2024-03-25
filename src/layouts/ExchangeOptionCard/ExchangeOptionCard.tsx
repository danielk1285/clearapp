import {DeselectedCheck, SelectedCheck} from '@assets/svg/icons';
import colors from '@theme/colors';
import {HStack, Pressable, Text, VStack} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {IExchangeOptionCard} from './ExchangeOptionCard.types';

export default function ExchangeOptionCard({
  isSelected,
  exchangeOptionItem,
  ...rest
}: IExchangeOptionCard) {
  return (
    <Pressable
      px="4"
      py={4}
      bg="white"
      {...rest}
      display="flex"
      flexDirection="row"
      alignItems="center">
      {isSelected === exchangeOptionItem.id ? (
        <SelectedCheck style={styles.iconStyle} />
      ) : (
        <DeselectedCheck style={styles.iconStyle} />
      )}
      <VStack pl="4" space="2">
        <Text color={colors.black} fontSize="md" fontWeight={500}>
          {exchangeOptionItem.title}
        </Text>
        <HStack justifyContent="space-between">
          <Text color={colors.gray[0]}>Time to complete:</Text>

          <Text color={colors.gray[0]}>{exchangeOptionItem.option}</Text>
        </HStack>
      </VStack>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconStyle: {
    height: 25,
    width: 25,
  },
});
