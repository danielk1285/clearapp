import GradientButton from '@components/GradientButton';
import {VStack} from 'native-base';
import React from 'react';
import {Dimensions} from 'react-native';
import SocialSignInBtns from '../SocialSignInBtns/SocialSignInBtns';
import {IOnBoardingFooter} from './OnBoardingFooter.types';
import OnboardingIndicator from './OnboardingIndicator';

export default function OnBoardingFooter({
  item,
  currentSlideIndex,
  goToNextSlide,
}: IOnBoardingFooter) {
  const {height} = Dimensions.get('window');
  return (
    <VStack h={height * 0.3} justifyContent="space-between" mb="20px">
      <OnboardingIndicator
        currentSlideIndex={currentSlideIndex}
        numberOfSlides={item.length - 1}
        showIndicator={currentSlideIndex !== item.length - 1}
      />

      <VStack px="4" pb={10}>
        {currentSlideIndex === item.length - 1 ? (
          <SocialSignInBtns />
        ) : (
          <GradientButton onPress={goToNextSlide}>Next</GradientButton>
        )}
      </VStack>
    </VStack>
  );
}
