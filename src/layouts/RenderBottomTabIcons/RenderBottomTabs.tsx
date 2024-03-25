import {
  HomeFillIcon,
  HomeIcon,
  ProfileFillIcon,
  ProfileIcon,
  WalletFillIcon,
  WalletIcon,
} from '@assets/svg/icons';
import {Text, VStack} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {IBottomTabComponent} from './RenderBottomabIcons.types';

export default function RenderBottomTabs({
  focused,
  routeName,
}: IBottomTabComponent) {
  let Icon = null;
  let title = '';
  switch (routeName) {
    case 'dashBoardScreen':
      Icon = focused ? HomeFillIcon : HomeIcon;
      title = 'Home';
      break;
    case 'myWalletScreen':
      Icon = focused ? WalletFillIcon : WalletIcon;
      title = 'Wallet';
      break;
    case 'profileScreen':
      Icon = focused ? ProfileFillIcon : ProfileIcon;
      title = 'Profile';
      break;
    default:
      break;
  }

  return (
    <VStack justifyContent={'center'} alignItems={'center'} space="1">
      <Icon style={styles.tabIcon} />
      <Text color={'#3A41FE'}>{title}</Text>
    </VStack>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    tintColor: '#3A41FE',
    height: 20,
    width: 20,
  },
});
