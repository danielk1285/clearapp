import {DualArrow} from '@assets/svg/icons';
import {Factory, Pressable} from 'native-base';
import React from 'react';
import {PressableProps} from '@typedef/native-base.types';
import {LinGrad} from '@components/FactoryComponents/FactoryComponents'
import {TouchableOpacity} from 'react-native';

export default function SwapBtn({onPress, ...rest}: PressableProps) {
  const Touchable = Factory(TouchableOpacity);

  return (
    <Touchable
      h="50px"
      w="50px"
      onPress={onPress}
      mx="auto"
      rounded={'full'}
      overflow="hidden"
      justifyContent="center"
      {...rest}>
      <LinGrad
        h="full"
        w="full"
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#8975F2', '#3940FF']}
        alignItems="center"
        justifyContent="center"
        display="flex">
        <DualArrow />
      </LinGrad>
    </Touchable>
  );
}
