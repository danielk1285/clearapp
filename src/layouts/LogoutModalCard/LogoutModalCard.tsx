import GradientButton from '@components/GradientButton';
import {Button, Pressable, Text, VStack} from 'native-base';
import React from 'react';
import {ILogoutModalCard} from './LogoutModalCard.types';
import OutlineButton from '@components/OutlineButton/OutlineButton';
import colors from '@theme/colors';

export default function LogoutModalCard({
  onClose,
  handleLogout,
}: ILogoutModalCard) {
  return (
    <VStack w="90%">
      <Text
        textAlign="center"
        fontSize="2xl"
        fontWeight={600}
        color={colors.black}>
        Log Out
      </Text>
      <Text textAlign="center" color={colors.gray[0]}>
        Are you sure you want to log out ?
      </Text>
      <VStack my="30px" space="10px">
        <GradientButton textProps={{fontWeight: 600}} onPress={onClose}>
          Cancel
        </GradientButton>
        <OutlineButton onPress={handleLogout}>Log out</OutlineButton>
      </VStack>
    </VStack>
  );
}
