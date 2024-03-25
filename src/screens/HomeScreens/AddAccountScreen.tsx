import {AddAccountIcon} from '@assets/svg/icons';
import {IAccountData} from '@components/AccountItem/AccountItem.types';
import AddAccount from '@components/AddAccount/AddAccount';
import GradientButton from '@components/GradientButton';
import useNavigate from '@hooks/useNavigate';
import AccountList from '@layouts/AccountList/AccountList';
import KeyboardAwareView from '@layouts/KeyboardAwareView/KeyboardAwareView';
import colors from '@theme/colors';

import {VStack} from 'native-base';
import React from 'react';
import {accountList} from '../../../data/accountList';
import asRoute from '../../hoc/asRoute';
import {useDispatch, useSelector} from 'react-redux';
import {selectHasViewedTutorials} from '@store/features/ui';
import {useRoute} from '@react-navigation/native';

function AddAccountScreen() {
  const [accountDetailsList, setAccountDetailsList] =
    React.useState<IAccountData[]>(accountList);
  const params = useRoute().params;

  const hasViewedTutorial = useSelector(selectHasViewedTutorials);
  const dispatch = useDispatch();

  const handleAddFund = () => {
    if (!hasViewedTutorial) {
      dispatch(setHasViewedTutorials(true));
      navigate('exchangeOptionScreen', params?.transferData);
    } else {
      navigate('detailsScreen', {
        type: 'addFunds',
      });
    }
  };

  const navigate = useNavigate();

  function handleAddNewAccount() {
    handleAddFund();
  }

  return (
    <KeyboardAwareView>
      <VStack px="20px" bg={colors.bg} flex={1} py={4}>
        {accountDetailsList?.length > 0 ? (
          <AccountList accountList={accountDetailsList} />
        ) : (
          <>
            <AddAccount
              title="You don't have any any balance yet."
              subTitle="Add funds to your account to continue."
              icon={<AddAccountIcon />}
            />
            <VStack mb="30px">
              <GradientButton onPress={handleAddNewAccount}>
                Add Funds
              </GradientButton>
            </VStack>
          </>
        )}
      </VStack>
    </KeyboardAwareView>
  );
}

const addAccountScreen = asRoute(AddAccountScreen, 'addAccountScreen', {
  title: 'Transfer Form',
});

export default addAccountScreen;
