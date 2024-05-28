import React from 'react';
import asRoute from 'hoc/asRoute';
import KeyboardAwareView from '@layouts/KeyboardAwareView/KeyboardAwareView';
import {Text, VStack} from 'native-base';
import CustomInput from '@components/CustomInput/CustomInput';
import {transferAccountData} from '@appData/myWallet';
import TransferAccountCard from '@layouts/TransferAccountCard/TransferAccountCard';
import TextButton from '@components/TextButton/TextButton';
import {ITransferAccountCard} from '@layouts/TransferAccountCard/TransferAccountCard.types';
import useNavigate from '@hooks/useNavigate';
import colors from '@theme/colors';
import {useRoute} from '@react-navigation/native';
import {useGetBankAccountsQuery} from '@store/apis/bankAccounntsApi';
import {useEffect} from 'react';
import {useGetWalletsQuery} from '@store/apis/walletsApi';

function WithdrawScreen() {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const params = useRoute().params as any;
  console.log('params', params);
  const {data, refetch} = useGetBankAccountsQuery({
    page: page,
    limit: 10,
  });

  const {data: bankAccountsData, isLoading: bankAccountsLoading} =
    useGetBankAccountsQuery({
      page: 1,
      limit: 5,
    });
  const wallet = params?.selectedWallet;
  console.log('wallet', wallet);
  const availableBalance = parseFloat(wallet?.amount);
  console.log('availableBalance', availableBalance);
  const [transactionAmount, setTransactionAmount] = React.useState(0);

  useEffect(() => {
    refetch(); // This will refetch the data when the component loads
  }, [params?.key]);
  
  const handleClickOnAccountItem = ({ transferAccountItem }: ITransferAccountCard) => {
    console.log('transferAccountItem', transferAccountItem);
    const { preferredCurrency: currency, id: amount, nickname: transferTo } = transferAccountItem;
    if (!insufficientBalance) {
      navigate('withdrawSummaryScreen', { currency, amount, transferTo });
    } else {
      // Optionally handle insufficient balance case here, maybe display a message.
      console.log('Insufficient balance for the transaction');
    }
  };
  

  const handleAddNewAccount = () => {
    navigate('addNewAccountScreen');
  };

  const bankaccounts =
    bankAccountsData?.length > 0
      ? (bankAccountsData as IBankAccountData[])
      : [];

  const insufficientBalance =
    !availableBalance || availableBalance < transactionAmount;
  console.log('insufficientBalance', insufficientBalance);
  return (
    <KeyboardAwareView>
      <VStack px="20px">
        <CustomInput
          title="Amount"
          placeholder="Enter amount"
          onChangeText={text => setTransactionAmount(text)}
          value={transactionAmount}
        />
        <Text color={colors.black} variant="h2" my="20px">
          Transfer To
        </Text>
        <VStack bg="#ffffff" borderRadius="8px" p="12px">
          {bankaccounts.map((transferAccountItem, index) => (
            <TransferAccountCard
              onPress={() => handleClickOnAccountItem({transferAccountItem})}
              transferAccountItem={transferAccountItem}
              key={index}
            />
          ))}
          {insufficientBalance && (
            <Text color={'#cc0000'} variant="h2" my="10px">
              Insufficient balance
            </Text>
          )}
          <TextButton
            onPress={handleAddNewAccount}
            my="10px"
            title="Add account"
          />
        </VStack>
      </VStack>
    </KeyboardAwareView>
  );
}

const withdrawScreen = asRoute(WithdrawScreen, 'withdrawScreen', {
  title: 'Withdraw',
});

export default withdrawScreen;
