import GradientButton from '@components/GradientButton';
import useNavigate from '@hooks/useNavigate';
import AccountListCard from '@layouts/AccountListCard/AccountListCard';
import KeyboardAwareView from '@layouts/KeyboardAwareView/KeyboardAwareView';
import {useRoute} from '@react-navigation/native';
import {useGetBankAccountsQuery} from '@store/apis/bankAccounntsApi';
import { useEffect } from 'react';
import {IBankAccountData, ITransectionData} from '@typedef/common.types';
import asRoute from 'hoc/asRoute';
import {Text, VStack} from 'native-base';
import React from 'react';

function AccountListScreen() {
  // const myAccountList = useRoute().params as IAccountListCardItem[];
  const [page, setPage] = React.useState(1);
  const [selectedAccount, setSelectedAccount] =
    React.useState<IBankAccountData>();

  const params = useRoute().params as ITransectionData;

  const {data,  refetch} = useGetBankAccountsQuery({
    page: page,
    limit: 10,
  });

  useEffect(() => {
    refetch(); // This will refetch the data when the component loads
  }, [params?.key]); 
  
  const navigate = useNavigate();

  const prevRoute =
    params?.type === 'addFunds' ? 'bankAccountsScreen' : 'withdrawFundsScreen';

  const handleAddAccount = () => {
    // addNewAccountScreen
    navigate('addFundStep1Screen', {
      wallet: true,
      ...params,
      prevRoute,
      selectedAccount,
    });
  };

  return (
    <KeyboardAwareView>
      <VStack px="20px" space="8">
        <AccountListCard
          title="My Accounts"
          subTitle="Add Account"
          accountList={data as any[]}
          onAddAccount={handleAddAccount}
          onAccountPress={account => {
            setSelectedAccount(account);
          }}
          selectedAccount={selectedAccount}>
          <AccountListCard.TitleWithAddButton />
          <AccountListCard.Accounts />
          {data?.length === 0 ? (
            <Text color={'gray.800'} textAlign="center" mt="16px">
              No account found
            </Text>
          ) : null}
        </AccountListCard>
        {selectedAccount ? (
          <GradientButton
            onPress={() => {
              navigate('fundDetailsScreen', {
                ...params,
                bankAccount: selectedAccount,
              });
            }}>
            Continue
          </GradientButton>
        ) : null}
      </VStack>
    </KeyboardAwareView>
  );
}

const accountListScreen = asRoute(AccountListScreen, 'accountListScreen', {
  title: 'Accounts',
});

export default accountListScreen;
