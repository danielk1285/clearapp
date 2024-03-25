import GradientButton from '@components/GradientButton';
import useNavigate from '@hooks/useNavigate';
import ProvideTransferCard from '@layouts/ProvideTransferCard/ProvideTransferCard';
import {useNavigation, useRoute} from '@react-navigation/native';
import colors from '@theme/colors';
import {HStack, Pressable, ScrollView, Text, VStack} from 'native-base';
import React from 'react';
import asRoute from 'hoc/asRoute';
import {CloseIcon} from '@assets/svg/icons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ITransectionNavigationParams} from '@typedef/common.types';

function TransferSourceScreen() {
  const route = useRoute();
  const navigate = useNavigate();
  const insets = useSafeAreaInsets();
  // const { firstCurrency, secondCurrency } = useRoute()?.params as { firstCurrency: string, secondCurrency: string };
  const params = route.params as ITransectionNavigationParams;
  console.log('params', params);
  const handleProvideTransferSource = () => {
    if (params.type === 'addFunds') {
      navigate(
        'detailsScreen',
        {
          type: params.type,
        },
        'replace',
      );
    } else {
      navigate('exchangeOptionScreen', params?.transferData, 'replace');
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack flex={1} pt={`${insets.top}px`}>
        <HStack justifyContent={'flex-end'} py={2} px={4}>
          <Pressable onPress={() => navigate(undefined, undefined, 'goBack')}>
            <CloseIcon />
          </Pressable>
        </HStack>
        <VStack
          px="20px"
          bg={colors.bg}
          flex={1}
          pt="20px"
          justifyContent="space-between">
          <ProvideTransferCard />
          <VStack mb="20px">
            <GradientButton onPress={handleProvideTransferSource}>
              Next
            </GradientButton>
          </VStack>
        </VStack>
      </VStack>
    </ScrollView>
  );
}

const transferSourceScreen = asRoute(
  TransferSourceScreen,
  'transferSourceScreen',
  {
    title: 'How it works',
    headerShown: false,
    animation: 'slide_from_bottom',
  },
);

export default transferSourceScreen;
