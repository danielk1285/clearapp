import React from 'react';
import { VStack, Text, Pressable } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import GradientButton from '@components/GradientButton';
import Entopy from 'react-native-vector-icons/Entypo';
import asRoute from 'hoc/asRoute';

const TransactionFailed = () => {
  const navigation = useNavigation();

  return (
    <VStack flex={1} justifyContent="center" alignItems="center" bg="white" px={4}>
      <Pressable
        position="absolute"
        top={4}
        left={4}
        onPress={() => navigation.goBack()}
      >
        <Entopy name="chevron-left" size={24} color="black" />
      </Pressable>

      <VStack alignItems="center" space={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Transaction Failed
        </Text>
        <Text fontSize="md" textAlign="center">
          We apologize for the system error that has caused your transaction to fail. We kindly ask you to please try again later.
        </Text>
      </VStack>

      <GradientButton mt={10} onPress={() => navigation.navigate('Home')}>
        Back To Home
      </GradientButton>
    </VStack>
  );
};

const transactionFailedRoute = asRoute(TransactionFailed, 'transactionFailed', {
    title: '',
  });

export default transactionFailedRoute;
