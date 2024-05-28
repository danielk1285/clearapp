import React, {useState} from 'react';
import asRoute from 'hoc/asRoute';
import KeyboardAwareView from '@layouts/KeyboardAwareView/KeyboardAwareView';
import {VStack, Text} from 'native-base';
import useNavigate from '@hooks/useNavigate';
import {
  currenciesArray,
  CurrencyValue,
} from '@screens/HomeScreens/DashBoardScreen';
import colors from '@theme/colors';
import GradientButton from '@components/GradientButton';
import {exchangeOptions} from '@appData/myWallet';
import ExchangeOptionCard from '@layouts/ExchangeOptionCard/ExchangeOptionCard';
import {useRoute} from '@react-navigation/native';
import {IExchangeRequest} from '@typedef/common.types';
import {firebase} from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import {useHandleTransactionsdsMutation} from '@store/avpiV2/userApiSlice';

function ExchangeOptionScreen() {
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState(exchangeOptions[0].id);
  const router = useRoute();
  const [exchangeFunds, exchangeFundsRes] = useHandleTransactionsdsMutation();

  const params = router.params as IExchangeRequest;

  const handleToContinue = async () => {
    try {
      const userId = firebase.auth().currentUser?.uid;

      const exchangeRequest: IExchangeRequest = {
        ...params,
        askedExchangeType: isSelected as any,
        userId: userId!,
      };
      const {data} = await exchangeFunds(exchangeRequest).unwrap();
      navigate('exchangeSummaryScreen',params);
    } catch (error) {
      // Alert.alert('Error', 'Something went wrong');
      navigate('transactionFailedRoute');
      console.log(error);
    }
  };
  return (
    <KeyboardAwareView>
      <VStack p="20px" space="8">
        <Text textAlign="center" color={colors.gray[0]}>
          We are matching your exchange with others that needs USD in exchange
          to ILS
        </Text>
        <VStack space="4">
          {exchangeOptions.map((exchangeOption, index) => (
            <ExchangeOptionCard
              onPress={() => setIsSelected(exchangeOption.id)}
              key={index}
              exchangeOptionItem={exchangeOption}
              isSelected={isSelected}
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

const exchangeOptionScreen = asRoute(
  ExchangeOptionScreen,
  'exchangeOptionScreen',
  {
    title: 'Exchange',
  },
);

export default exchangeOptionScreen;
