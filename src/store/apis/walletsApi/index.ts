import {apiSlice} from '../index';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const walletsApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getWallets: builder.query({
      async queryFn() {
        const user = auth().currentUser;
        if (!user) {
          throw new Error('User not found');
        } else {
          const username = auth().currentUser?.uid;
          const testAcc = 'test_user_11ewo7GQZW';

          const userInfo = firestore().collection('users').doc(username);
          const currencies = await firestore()
            .collection('currencies')
            .doc('currencies')
            .get();

          const userRes = await userInfo.get();
          const userData = userRes.data();
          const currenciesData = currencies.data();
          const currencyArray = Object.values(currenciesData || {});

          const userWallets = userData?.Wallets?.map((wallet: any) => {
            const currencyItem = currencyArray?.find(
              (currency: any) =>
                currency?.code?.toLowerCase() ===
                wallet?.currency?.toLowerCase(),
            );
            return {
              ...wallet,
              symbol: currencyItem?.symbol,
            };
          });

          return {
            data: userWallets || [],
          };
        }
      },
    }),
    hasSufficientFunds: builder.query({
      async queryFn({
        fromCurrency,
        fromAmount,
      }: {
        fromCurrency: any;
        fromAmount: any;
      }) {
        const user = auth().currentUser;
        if (!user) {
          return false;
        } else {
          const username = auth().currentUser?.uid;
          const testAcc = 'test_user_11ewo7GQZW';

          const userInfo = firestore().collection('users').doc(username);
          const currencies = await firestore()
            .collection('currencies')
            .doc('currencies')
            .get();

          const userRes = await userInfo.get();
          const userData = userRes.data();
          const currenciesData = currencies.data();
          const currencyArray = Object.values(currenciesData || {});

          const userWallets = userData?.Wallets?.map((wallet: any) => {
            const currencyItem = currencyArray?.find(
              (currency: any) =>
                currency?.code?.toLowerCase() ===
                wallet?.currency?.toLowerCase(),
            );
            return {
              ...wallet,
              symbol: currencyItem?.symbol,
            };
          });

          console.log('userWallets', {userWallets, fromCurrency, fromAmount});

          const hasSufficientFunds = userWallets?.find(
            (wallet: any) =>
              wallet?.currency?.toLowerCase() === fromCurrency.toLowerCase(),
          );

          console.log(
            'hasSufficientFunds',
            hasSufficientFunds?.amount >= fromAmount,
          );

          return {
            data: hasSufficientFunds?.amount >= fromAmount,
          };
        }
      },
    }),
  }),
});

export const {useGetWalletsQuery, useLazyHasSufficientFundsQuery} = walletsApi;
