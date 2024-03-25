import colors from '@theme/colors';
import {HStack, Image, Pressable, Text} from 'native-base';
import React from 'react';
import Entopy from 'react-native-vector-icons/Entypo';
import {ISelectCurrencyBtnProps} from './SelectCurrencyBtn.types';

export default function SelectCurrencyBtn({
  onPress,
  currency = '$ (USD)',
  flag = 'https://static.vecteezy.com/system/resources/thumbnails/000/532/212/small/usa-01.jpg',
}: ISelectCurrencyBtnProps) {
  return (
    <Pressable
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      onPress={onPress}>
      <HStack space={1} alignItems="center">
        <Image
          source={{
            uri: flag,
          }}
          alt={currency}
          h="20px"
          w="20px"
          rounded={'full'}
          mr={2}
        />
        <Text fontWeight={500} color={colors.black}>
          {currency}
        </Text>
        <Entopy name="chevron-down" size={20} color={colors.gray[0]} />
      </HStack>
    </Pressable>
  );
}
