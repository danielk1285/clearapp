import GradientButton from '@components/GradientButton';
import TextButton from '@components/TextButton/TextButton';
import useNavigate from '@hooks/useNavigate';
import BankDetailsCard from '@layouts/BankDetailsCard/BankDetailsCard';
import ImportantNote from '@layouts/ImportantNote/ImportantNote';
import KeyboardAwareView from '@layouts/KeyboardAwareView/KeyboardAwareView';
import LoaderModal from '@layouts/LoaderModal.tsx/LoaderModal';
import {useRoute} from '@react-navigation/native';
import {useGetTransferBankAccountQuery} from '@store/apis/bankAccounntsApi';
import colors from '@theme/colors';
import {IBankAccountData, ITransectionData} from '@typedef/common.types';
import asRoute from 'hoc/asRoute';
import {Text, VStack} from 'native-base';
import React from 'react';

interface IBankAccountResponse {
  accountNumber: number;
  address: string;
  bankName: string;
  branch: string;
  routingNumber: string;
}

function FundDetailsScreen() {
  const navigate = useNavigate();

  const params = useRoute().params as ITransectionData & {
    bankAccount: IBankAccountData;
  };

  const bankId =
    params?.type === 'addFunds'
      ? params?.fromCurrency?.currencyCode
      : params?.toCurrency?.currencyCode;

  const {data: res, isLoading} = useGetTransferBankAccountQuery({
    id: bankId,
  });

  const data = res?.bankAccount as IBankAccountResponse;

  const handleSkipNow = () => {
    navigate('dashBoardScreen');
  };

  const handleWiredFunds = () => {
    navigate('uploadFundInfoScreen', {
      ...params,
    });
  };

  return (
    <KeyboardAwareView>
      <VStack px="20px" bg={colors.bg} flex={1} pt="20px">
        <Text color={colors.black} variant="h2">
          Open your bank app to wire the funds to
        </Text>

        <VStack mt="16px">
          <BankDetailsCard
            bankName={data?.bankName}
            address={data?.address}
            accountNumber={data?.accountNumber}
            branch={data?.branch}
            routingNumber={data?.routingNumber}
          />
        </VStack>
        <VStack mt="16px">
          <ImportantNote
            title="Important"
            subTitle="Save a confirmation - a screenshot or a PDF that you made the transfer."
          />
        </VStack>

        <VStack mt="30px">
          <GradientButton onPress={handleWiredFunds}>
            I Wired Funds
          </GradientButton>
        </VStack>
        <VStack my="24px">
          <TextButton title="Skip for now" onPress={handleSkipNow} />
        </VStack>
      </VStack>
      <LoaderModal isLoading={isLoading} />
    </KeyboardAwareView>
  );
}

const fundDetailsScreen = asRoute(FundDetailsScreen, 'fundDetailsScreen', {
  title: 'Bank Details',
});

export default fundDetailsScreen;
