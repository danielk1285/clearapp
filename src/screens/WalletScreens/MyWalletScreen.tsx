import MyBalanceModalCardItem from '@actionSheets/ActionsheetModal/MyBalanceModalCardItem';
import {myBalanceActionList} from '@appData/myWallet';
import AddHeader from '@components/TitleWithAddButton';
import useNavigate from '@hooks/useNavigate';
import AccountListCard from '@layouts/AccountListCard/AccountListCard';
import KeyboardAwareView from '@layouts/KeyboardAwareView/KeyboardAwareView';
import MyBalanceCard from '@layouts/MyBalanceCard/MyBalanceCard';
import {useGetBankAccountsQuery} from '@store/apis/bankAccounntsApi';
import {useGetWalletsQuery} from '@store/apis/walletsApi';
import {
  selectHasViewedTutorials,
  setHasViewedTutorials,
} from '@store/features/ui';
import colors from '@theme/colors';
import {IWalletData} from '@typedef/common.types';
import asRoute from 'hoc/asRoute';
import {Pressable, Skeleton, Text, useDisclose, VStack} from 'native-base';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ActionsheetModal from '@actionSheets/ActionsheetModal/ActionsheetModal';
import {IBankAccountData} from '@typedef/common.types';

function MyWalletScreen() {
  const navigate = useNavigate();

  const handleActionSelected = (action: string, currency?: string) => {
    if (action === 'Start Withdraw') {
      navigate('withdrawScreen');
    } else {
      navigate('exchangeScreen', { currency });
    }
  };

  const hasViewedTutorial = useSelector(selectHasViewedTutorials);
  const dispatch = useDispatch();

  const [selectedWallet, setSelectedWallet] = React.useState<IWalletData>();

  const {isOpen, onClose, onOpen} = useDisclose();

  const {data, isLoading} = useGetWalletsQuery(undefined);
  const {data: bankAccountsData, isLoading: bankAccountsLoading} =
    useGetBankAccountsQuery({
      page: 1,
      limit: 5,
    });

  const handleAddAccount = () => {
    navigate('addFundStep1Screen', {
      type: 'addNewBankAccount',
    });
  };
  const handleAddFund = () => {
    if (!hasViewedTutorial) {
      dispatch(setHasViewedTutorials(true));
      navigate('transferSourceScreen', {
        type: 'addFunds',
      });
    } else {
      navigate('detailsScreen', {
        type: 'addFunds',
      });
    }
  };
  const handleViewAllAccounts = () => {
    navigate('accountListScreen');
  };

  const bankaccounts = bankAccountsData as IBankAccountData[];

  console.log(bankaccounts);

  return (
    <KeyboardAwareView>
      <VStack p="20px" space="4">
        <AddHeader
          onAddAccount={handleAddFund}
          title="My Balances"
          subTitle="Add Funds"
        />
        <Skeleton isLoaded={!isLoading}>
          {data?.map((wallet: IWalletData) => (
            <MyBalanceCard
              key={wallet.id}
              onPress={() => {
                setSelectedWallet(wallet);
                onOpen();
              }}
              balanceType={`${wallet.currency} Wallet`}
              amount={`${wallet.symbol} ${wallet.amount} ${wallet.currency}`}
            />
          ))}
        </Skeleton>
        {data?.length <= 0 ? (
          <Text py={4} textAlign="center" color={colors.gray[5]}>
            No Wallets Found
          </Text>
        ) : null}
        <AccountListCard
          title="My Accounts"
          subTitle="Add Account"
          accountList={bankaccounts}
          onAddAccount={handleAddAccount}>
          <AccountListCard.TitleWithAddButton />
          <AccountListCard.Accounts />
        </AccountListCard>
        {bankaccounts?.length > 0 ? (
          <Pressable py={3} onPress={handleViewAllAccounts}>
            <Text textAlign="center" color={colors.primary} fontWeight={500}>
              View All Accounts
            </Text>
          </Pressable>
        ) : (
          <Text
            textAlign="center"
            color={colors.gray[5]}
            fontWeight={500}
            my={6}>
            No Accounts Found
          </Text>
        )}
      </VStack>
      <ActionsheetModal isOpen={isOpen} onClose={onClose}>
        <MyBalanceModalCardItem
          onActionSelected={handleActionSelected}
          actionList={myBalanceActionList}
          currency={selectedWallet?.currency}
          selectedWallet={selectedWallet}
          onClose={onClose} 
        />
      </ActionsheetModal>
    </KeyboardAwareView>
  );
}

const myWalletScreen = asRoute(MyWalletScreen, 'myWalletScreen', {
  title: 'My Wallet',
});

export default myWalletScreen;
