import { getExchangeSummary } from '@appData/myWallet';
import GradientButton from '@components/GradientButton';
import useNavigate from '@hooks/useNavigate';
import ExchangeSummaryCard from '@layouts/ExchangeSummaryCard/ExchangeSummaryCard';
import KeyboardAwareView from '@layouts/KeyboardAwareView/KeyboardAwareView';
import asRoute from 'hoc/asRoute';
import {VStack} from 'native-base';
import {useRoute} from '@react-navigation/native';
import {IExchangeRequest} from '@typedef/common.types';

import React from 'react';

/*
import {useGetConversionRatesQuery} from '@store/apis';


data.currencies.find(
  item => item.currencyCode === 'USD',
);
*/


function ExchangeSummaryScreen() {
  const navigate = useNavigate();
  const router = useRoute();
  const params = router.params as IExchangeRequest;
  const exchangeSummary = getExchangeSummary((params?.conversionRate*0.95), params?.conversionRate*1.05);//Fix This Move to server

  const handleToContinue = () => {
    navigate('myWalletScreen');//Fix this - Sometime return to home screen and some times to the wallet.
  };
  return (
    <KeyboardAwareView>
      <VStack p="20px" space="20">
        <VStack bg="white" p="16px" borderRadius="8px">
          {exchangeSummary.map((exchangeSummary, index) => (
            <ExchangeSummaryCard
              key={index}
              exchangeSummary={exchangeSummary}
            />
          ))}
        </VStack>
        <GradientButton mt="20px" onPress={handleToContinue}>
          Continue
        </GradientButton>
      </VStack>
    </KeyboardAwareView>
  );
}

const exchangeSummaryScreen = asRoute(
  ExchangeSummaryScreen,
  'exchangeSummaryScreen',
  {
    title: 'Summary',
  },
);

export default exchangeSummaryScreen;
