import AccountItem from '@components/AccountItem/AccountItem';
import GradientButton from '@components/GradientButton';
import TextButton from '@components/TextButton/TextButton';
import useNavigate from '@hooks/useNavigate';
import KeyboardAwareView from '@layouts/KeyboardAwareView/KeyboardAwareView';
import colors from '@theme/colors';
import {Text, VStack} from 'native-base';
import React, {useState} from 'react';
import {Alert} from 'react-native';
import {IAccountList} from './AccountList.types';

export default function AccountList({accountList}: IAccountList) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleAddAccount = () => {
    navigate('addNewAccountScreen');
  };

  const handleToContinue = () => {
    if (selectedId) {
      navigate('fundDetailsScreen');
    } else {
      Alert.alert(
        'Select Account',
        'Please select a bank account to continue!',
      );
    }
  };

  return (
    <KeyboardAwareView>
      <VStack bg={colors.bg} flex={1} pt="20px">
        <Text color={colors.black} variant="h2">
          Where are you sending funds from?
        </Text>

        {accountList.length > 0 ? (
          <VStack mt="16px">
            {accountList.map((account, index) => (
              <AccountItem
                key={account.id}
                onPress={() => setSelectedId(account.id)}
                data={account}
                isSelected={account.id === selectedId}
              />
            ))}
          </VStack>
        ) : (
          <Text color={'gray.400'} textAlign="center" mt="16px">
            No account found
          </Text>
        )}

        <VStack my="24px">
          <TextButton title="Add new account" onPress={handleAddAccount} />
        </VStack>

        <VStack my="30px">
          <GradientButton onPress={handleToContinue}>Continue</GradientButton>
        </VStack>
      </VStack>
    </KeyboardAwareView>
  );
}
