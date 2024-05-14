import {CopyIcon, ShareIcon} from '@assets/svg/icons';
import Clipboard from '@react-native-clipboard/clipboard';
import colors from '@theme/colors';
import {Box, HStack, Pressable, Text, useToast} from 'native-base';
import React from 'react';
import {Alert, Share} from 'react-native';
import {IBankDetailsCardItem} from './BankDetailsCard.types';

export default function BankDetailsCardItem({
  itemKey,
  value,
  isShareable = false,
}: IBankDetailsCardItem) {
  const toast = useToast();

  const handleCopy = () => {
    Clipboard.setString(JSON.stringify({'Account Number': value}));
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
        message: `Account Number: ${value}`,
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
    <HStack justifyContent="space-between" alignItems="center">
      <Text w="1/2" fontSize="sm" fontWeight={500} color={colors.black}>
        {itemKey}
      </Text>
      {isShareable ? (
        <HStack w="1/2" justifyContent="space-between" alignItems="center">
          <Text color={colors.gray[0]}>{value}</Text>
          <HStack space="10px">
            <Pressable
              onPress={handleCopy}
              alignItems="center"
              justifyContent="center">
              <CopyIcon
                style={{height: 16, width: 16, resizeMode: 'contain'}}
              />
              <Text fontSize="2xs">copy</Text>
            </Pressable>
            <Pressable
              onPress={handleShare}
              alignItems="center"
              justifyContent="center">
              <ShareIcon
                style={{height: 16, width: 16, resizeMode: 'contain'}}
              />
              <Text fontSize="2xs">share</Text>
            </Pressable>
          </HStack>
        </HStack>
      ) : (
        <Text w="1/2" color={colors.gray[0]}>
          {value}
        </Text>
      )}
    </HStack>
  );
}
