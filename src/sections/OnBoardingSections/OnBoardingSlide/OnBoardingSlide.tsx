import { IOnBoardingItem } from '@screens/AuthScreens/OnBoardingScreen';
import colors from '@theme/colors';
import { Text, VStack } from 'native-base';
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import VectorImage from 'react-native-vector-image';
import Images from '@assets/svg/onboarding.svg';
//FIX: Return to VectorImage
const { width } = Dimensions.get('window');

export default function OnBoardingSlide({ item }: IOnBoardingItem) {
  return (
    <VStack
      space={'30px'}
      alignItems={'center'}
      justifyContent={'center'}
      width={width}>
      <VStack maxW={'250px'} width={width * 0.9} height={width * 0.6}>
        <VectorImage source={item.image} style={styles.image} />
      </VStack>
      <VStack space={4}>
        <Text color={colors.black} fontSize="3xl" fontWeight={700} textAlign="center">
          {item.title}
        </Text>
        <Text
          maxW={'200px'}
          color="#616164"
          fontSize="lg"
          fontWeight={400}
          textAlign="center"
          mx="auto">
          {item.subtitle}
        </Text>
      </VStack>
    </VStack>
  );
}

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
});
