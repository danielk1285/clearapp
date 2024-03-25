import {PlusIcon} from '@assets/svg/icons';
import colors from '@theme/colors';
import {HStack, Pressable, Text} from 'native-base';
import React from 'react';

export default function AddHeader({
  title,
  subTitle,
  onAddAccount,
}: {
  title: string;
  subTitle: string;
  onAddAccount: () => void;
}) {
  return (
    <HStack justifyContent="space-between" alignItems="center">
      <Text color={colors.black} variant="h2">
        {title}
      </Text>
      <Pressable
        flexDirection="row"
        alignItems="center"
        style={{
          gap: 5,
        }}
        onPress={onAddAccount}>
        <PlusIcon
          style={{
            width: 20,
            height: 20,
            tintColor: colors.primary,
          }}
        />
        <Text fontSize="xs" color={colors.primary}>
          {subTitle}
        </Text>
      </Pressable>
    </HStack>
  );
}
