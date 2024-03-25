import {CopyIcon, ShareIcon} from '@assets/svg/icons';
import Clipboard from '@react-native-community/clipboard';
import colors from '@theme/colors';
import {Box, HStack, Pressable, Text, VStack, useToast} from 'native-base';
import React from 'react';
import {Alert, Share} from 'react-native';
import {IBankDetailsCard} from './BankDetailsCard.types';
import BankDetailsCardItem from './BankDetailsCardItem';

export default function BankDetailsCard({
  bankName,
  address,
  accountNumber,
  branch,
  routingNumber,
  ...rest
}: IBankDetailsCard) {
  const toast = useToast();

  const handleCopy = () => {
    var s = `${bankName}\n${address}\n${accountNumber}\n${branch}\n${routingNumber}`;
    Clipboard.setString(s.split('undefined\n').join(''));
    toast.show({
      placement: 'bottom',
      render: () => {
        return (
          <Box bg={colors.primary} px="2" py="2" rounded="sm">
            <Text color="#ffffff">Copied!</Text>
          </Box>
        );
      },
    });
  };
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Here are our bank details:\nBank Name: ${bankName}, Address: ${address}, Account Number: ${accountNumber}, Branch: ${branch}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };
  return (
    <VStack bg="#ffffff" py="20px" px="16px" borderRadius="8px">
      <HStack justifyContent="space-between" mb="20px" alignItems="center">
        <Text color={colors.black} variant="h2">
          Details
        </Text>
        <HStack space="18px">
          <Pressable onPress={handleCopy} alignItems="center">
            <CopyIcon />
            <Text fontSize="2xs">copy</Text>
          </Pressable>
          <Pressable onPress={handleShare} alignItems="center">
            <ShareIcon />
            <Text fontSize="2xs">share</Text>
          </Pressable>
        </HStack>
      </HStack>
      <VStack
        borderStyle="dashed"
        borderWidth={1}
        borderColor={colors.gray[3]}
      />
      <VStack justifyContent="space-between" mt="20px" space="15px">
        <BankDetailsCardItem itemKey="Bank Name:" value={bankName} />
        <BankDetailsCardItem itemKey="Address:" value={address} />
        <BankDetailsCardItem
          itemKey="Account Number:"
          value={accountNumber}
          isShareable={true}
        />
        <BankDetailsCardItem itemKey="Branch:" value={branch} />
        <BankDetailsCardItem itemKey="Routing Number:" value={routingNumber} />
      </VStack>
    </VStack>
  );
}
