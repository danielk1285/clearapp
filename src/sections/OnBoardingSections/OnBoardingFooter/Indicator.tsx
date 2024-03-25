import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

export default function Indicator({isActive}: {isActive: boolean}) {
  const animatedValue = useDerivedValue(() => {
    return isActive
      ? withTiming(1, {
          duration: 500,
        })
      : withTiming(0, {
          duration: 500,
        });
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: animatedValue.value === 1 ? 24 : 8,
      backgroundColor: interpolateColor(
        animatedValue.value,
        [0, 1],
        ['#D6D6D6', '#3940FF'],
      ),
    };
  });

  return <Animated.View style={[styles.circle, animatedStyle]} />;
}

const styles = StyleSheet.create({
  circle: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: '#D6D6D6',
  },
});
