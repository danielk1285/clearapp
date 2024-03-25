import colors from '@theme/colors';
import {IBankAccountData} from '@typedef/common.types';
import moment from 'moment';
import {HStack, Pressable, Text, VStack} from 'native-base';
import React from 'react';
import {AccountListContext} from '@layouts/AccountListCard/AccountListCard';

function AccountListCardItem({account}: {account: IBankAccountData}) {
  const {onAccountPress, selectedAccount} =
    React.useContext(AccountListContext);

  const isSelected = selectedAccount?.id === account.id;

  return (
    <Pressable
      bg="#ffffff"
      p="16px"
      borderRadius="8px"
      onPress={() => onAccountPress?.(account)}
      borderWidth={1}
      borderColor={isSelected ? colors.primary : 'transparent'}>
      <Text color={colors.black} variant="h2" fontWeight={500}>
        {account.nickname}
      </Text>
      <HStack justifyContent="space-between" alignItems="center" mt="4">
        <Text color={colors.gray[0]}>{account.accountCurrency}</Text>
        <Text color={colors.gray[0]}>
          Added{' '}
          {account?.userVerificationCred?.Time
            ? moment(new Date(account?.userVerificationCred?.Time)).format(
                'MM/YY',
              )
            : ''}
        </Text>
      </HStack>
    </Pressable>
  );
}

const Accounts = () => {
  const {accountList} = React.useContext(AccountListContext);
  return (
    <VStack space="4">
      {accountList?.map(account => {
        return <AccountListCardItem key={account.id} account={account} />;
      })}
    </VStack>
  );
};

export default Accounts;
