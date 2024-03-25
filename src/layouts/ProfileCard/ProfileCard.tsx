import { VStack, Image, Text } from 'native-base';
import React from 'react';
import { IProfileCard } from './ProfileCard.types';
import colors from '@theme/colors';

export default function ProfileCard({ gmail, name, profilePic }: IProfileCard) {
  return (
    <VStack
      alignItems="center"
      justifyContent="center"
      bg="#ffffff"
      py="24px"
      borderRadius="8px">
      <VStack
        alignItems="center"
        justifyContent="center"
        h="120px"
        w="120px"
        rounded="full"
        mb="20px"
        borderWidth={1}
        borderColor={colors.gray[0]}
        p="8px"
        borderStyle="dashed">
        <Image
          source={{ uri: profilePic }}
          alt="profile"
          h="full"
          w="full"
          rounded="full"
        />
      </VStack>
      <Text fontSize="lg" fontWeight={500} color={colors.gray[0]}>
        {name}
      </Text>
      <Text fontSize="md" color={colors.gray[0]}>
        {gmail}
      </Text>
    </VStack>
  );
}
