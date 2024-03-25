import provideTransferCardData from '@appData/provideTransferCardData';
import {Text, VStack} from 'native-base';
import React from 'react';
import ProvideTransferIndividualCard from './ProvideTransferIndividualCard';

export default function ProvideTransferCard() {
  return (
    <VStack bg="#ffffff" py="24px" px="16px" borderRadius="16px" space="6">
      <VStack space="2" justifyContent={'center'} alignItems="center" mb={2}>
        <Text textAlign="center" fontWeight={700} fontSize="xl" color="black">
          How it works?
        </Text>
        <Text textAlign="center" color="black" maxW="200px">
          Add funds to your account with these quick steps:
        </Text>
      </VStack>

      {provideTransferCardData.map((data, index) => {
        return (
          <ProvideTransferIndividualCard
            key={data.id}
            data={data}
            isLast={index === provideTransferCardData.length - 1}
          />
        );
      })}
    </VStack>
  );
}
