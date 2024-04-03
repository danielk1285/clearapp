import BackButton from '@assets/svg/BackButton';
import {LinGrad} from '@components/FactoryComponents/FactoryComponents';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {gradient} from '@theme/colors';
import {Box, Center, Pressable, Text} from 'native-base';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Entopy from 'react-native-vector-icons/Entypo';
//import Ionicons from 'react-native-vector-icons/Ionicons';

type HeaderProps = NativeStackHeaderProps & {
  hideBackButton?: boolean;
};

export default function Header(props: HeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <LinGrad
      colors={gradient.upper}
      px={4}
      pt={`${28 + insets.top}px`}
      pb="7"
      alignItems="flex-end"
      flexDirection="row"
      justifyContent="space-between"
      w={'full'}>
      <Box w={'15%'}>
        {props.navigation.canGoBack() && !props.hideBackButton ? (
          <Pressable
            px="10px"
            onPress={() => {
              props.navigation.goBack();
              console.log('go back');
            }}>
            {props.navigation.canGoBack() ? (
              <Entopy size={24} color={'white'} name={'chevron-left'} />
            ) : null}
          </Pressable>
        ) : null}
      </Box>
      <Center width={'70%'}>
        <Text mx={'auto'} color={'white'} fontWeight={700} fontSize={'md'}>
          {props.options.title}
        </Text>
      </Center>
      <Box w={'15%'}>
        {props.options.headerRight ? props.options.headerRight() : null}
      </Box>
    </LinGrad>
  );
}