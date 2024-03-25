import useNavigate from '@hooks/useNavigate';
import CardInfo from '@layouts/CardInfo/CardInfo';
import colors from '@theme/colors';
import {Pressable, Text, VStack} from 'native-base';
import React from 'react';
import {IActionsheetItem} from './ActionsheetModal.types';
import {Alert} from 'react-native';

export default function MyBalanceModalCardItem({
  actionList,
  currency,
  selectedWallet,
  onActionSelected,
  onClose
}: IActionsheetItem &  { onActionSelected: (action: string, currency?: string) => void, onClose: () => void }) {
  const handleNavigation = (item: string) => {
    if (item === 'Start Withdraw' && selectedWallet?.amount === 0) {
      Alert.alert(
        'Insufficient Balance',
        'You have insufficient balance to withdraw',
      );
    } else {
      onActionSelected(item, currency); // Call the callback function with the selected action
      onClose(); // Close the modal
    }
  };

  console.log(actionList);

  return (
    <VStack w="full" pt="20px" space="2" pb="30px">
      {actionList.map((item, index) => (
        <Pressable
          display="flex"
          alignItems="center"
          flexDirection="row"
          px="10px"
          py="1"
          onPress={() => handleNavigation(item.title)}
          key={item.title}>
          <CardInfo
            h="30px"
            w="30px"
            iconStyle={{height: 20, width: 20}}
            icon={item.icon}
            mb="0"
          />
          <Text ml={2} color={colors.gray[0]} fontSize="md">
            {item.title}
          </Text>
        </Pressable>
      ))}
    </VStack>
  );
}
