import colors from '@theme/colors';
import {HStack, Image, Pressable, Text} from 'native-base';
import React, { useMemo } from 'react';
import Entopy from 'react-native-vector-icons/Entypo';
import {ISelectCurrencyBtnProps} from './SelectCurrencyBtn.types';
import IsraelFlag from '@assets/svg/IsraelFlag';
import USAFlag from '@assets/svg/UsaFlag';
import EUFlag from '@assets/svg/EUFlag';
import UKFlag from '@assets/svg/UKFlag';
import {View} from 'react-native';

export default function SelectCurrencyBtn({
  onPress,
  currency = '$ (USD)',
}: // flag = 'https://static.vecteezy.com/system/resources/thumbnails/000/532/212/small/usa-01.jpg',
ISelectCurrencyBtnProps) {
  const currencySymbol = currency.split(' ')[0];
  const flagSVG = useMemo(() => {
    switch (currencySymbol) {
      case '₪':
        return <IsraelFlag style={{ marginRight: 2, height: 30, width: 30 }} />;
      case '$':
        return <USAFlag style={{ marginRight: 2, height: 30, width: 30 }} />;
      case '£':
        return (
          <Image
            source={require('@assets/images/flag_united_kingdom.png')}
            alt={currency}
            h="30px"
            w="30px"
            rounded={'full'}
            mr={2}
          />
        );
      case '€':
        return (
          <Image
            source={require('@assets/images/flag_european_union.png')}
            alt={currency}
            h="30px"
            w="30px"
            rounded={'full'}
            mr={2}
          />
        );
      default:
        return null; // Use null instead of <></> for potentially unmounted component
    }
  }, [currencySymbol]);

  return (
    <Pressable
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      onPress={onPress}>
      <HStack space={1} alignItems="center">
        {flagSVG}
        {/* <Image
          source={{
            uri: flag,
          }}
          alt={currency}
          h="20px"
          w="20px"
          rounded={'full'}
          mr={2}
        /> */}
        <Text fontWeight={500} color={colors.black}>
          {currency}
        </Text>
        <Entopy name="chevron-down" size={20} color={colors.gray[0]} />
      </HStack>
    </Pressable>
  );
}
