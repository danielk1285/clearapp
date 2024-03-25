import TitleWithAddButton from '@components/TitleWithAddButton/TitleWithAddButton';
import {VStack} from 'native-base';
import React from 'react';
import {IAccountListCard} from './AccountListCard.types';
import Accounts from './AccountListCardItem';

export const AccountListContext = React.createContext<IAccountListCard>({
  title: '',
  subTitle: '',
  accountList: [],
  onAddAccount: () => {},
  onAccountPress: () => {},
  selectedAccount: undefined,
});

export default function AccountListCard({
  title,
  subTitle,
  accountList,
  onAccountPress,
  onAddAccount,
  children,
  selectedAccount,
}: IAccountListCard) {
  const values = React.useMemo(
    () => ({
      title,
      subTitle,
      accountList,
      onAccountPress,
      onAddAccount,
      selectedAccount,
    }),

    [
      title,
      subTitle,
      accountList,
      onAccountPress,
      onAddAccount,
      selectedAccount,
    ],
  );

  return (
    <AccountListContext.Provider value={values}>
      <VStack space="4" mt="20px">
        {children}
      </VStack>
    </AccountListContext.Provider>
  );
}

AccountListCard.TitleWithAddButton = TitleWithAddButton;
AccountListCard.Accounts = Accounts;
