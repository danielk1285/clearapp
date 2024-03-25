import {Box, HStack} from 'native-base';
import React from 'react';
import {IOnBoardingIndicatorProps} from './OnboardingIndicator.types';
import Indicator from './Indicator';

export default function OnboardingIndicator({
  currentSlideIndex,
  numberOfSlides,
  showIndicator,
}: IOnBoardingIndicatorProps) {
  const items = Array.from(Array(numberOfSlides).keys());
  if (!showIndicator) {
    return null;
  }
  return (
    <HStack justifyContent={'center'} space={2}>
      {items.map((_, index) => {
        return (
          <Indicator
            key={index.toString() + ' ' + currentSlideIndex}
            isActive={currentSlideIndex === index}
          />
        );
      })}
    </HStack>
  );
}
