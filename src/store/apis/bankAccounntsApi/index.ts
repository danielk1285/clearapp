import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import arrayUnion from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

import {apiSlice} from '../index';
import {IBankAccount} from './types';

export const bankAccountsApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getBankAccounts: builder.query({
      async queryFn({page = 1, limit = 10}: {page?: number; limit?: number}) {
        const user = auth().currentUser;
        if (!user) {
          throw new Error('User not found');
        } else {
          const username = user.uid;
          //const testAcc = 'test_user_11ewo7GQZW'; Here for testing perpose

          const userInfo = firestore().collection('users').doc(username);

          console.log('userInfo', userInfo);

          const userRes = await userInfo.get();
          const userData = userRes.data()?.BankAccounts;

          const paginatedData = userData?.slice(
            (page - 1) * limit,
            page * limit,
          );

          return {
            data: userData || [],
          };
        }
      },
    }),
    getPaginatedBankAccounts: builder.query({
      async queryFn({page = 1, limit = 10}: {page?: number; limit?: number}) {
        const user = auth().currentUser;
        if (!user) {
          throw new Error('User not found');
        } else {
          const email = user.email;
          const username = user?.uid;

          const userInfo = firestore().collection('users').doc(username);

          console.log('userInfo', userInfo);

          const userRes = await userInfo.get();
          const userData = userRes.data()?.BankAccounts;

          const paginatedData = userData;

          return {
            data: paginatedData || [],
          };
        }
      },
    }),
    getTransferBankAccount: builder.query({
      async queryFn({id}: {id: string}) {
        try {
          console.log('id', id);
          const bankAccount = await firestore()
            .collection('bankAccounts')
            .doc(id)
            .get();

          return {
            data: {
              status: 200,
              message: 'Success',
              bankAccount: bankAccount.data(),
            },
          };
        } catch (error) {
          console.log('error', error);
          return {
            data: {
              status: 500,
              message: 'Internal server error',
              error,
            },
          };
        }
      },
    }),
    addBankAccount: builder.mutation({
      queryFn: async ({
        accountCurrency,
        accountNumber,
        bankAddress,
        bankCountry,
        bankName,
        branchNumber,
        iban,
        nickname,
        preferredCurrency,
        routingNumber,
        swift,
        verificationImageLink,
      }: IBankAccount) => {
        try {
          const userName = auth().currentUser?.uid;
          const bankAccData = {
            id: uuid.v4(),
            date: new Date(),
            accountCurrency,
            accountNumber,
            bankAddress,
            bankCountry,
            bankName,
            //branchNumber,
            iban,
            nickname,
            preferredCurrency,
            routingNumber,
            swift,
            verificationImageLink,
            verificationStatus: 'Pending',
          };

          const userDoc = await firestore()
            .collection('users')
            .doc(userName)
            .get();

          const userObject = userDoc.data();

          const usersBankAccounts = userObject?.BankAccounts || [];
          
     


          console.log('Added bank account', bankAccData);

          // create collection named BankAccounts if not exists inside users collection
          await firestore()
            .collection('users')
            .doc(userName)
            .update({BankAccounts: firestore.FieldValue.arrayUnion(bankAccData)});



          return {
            data: {
              status: 200,
              message: 'Bank account added successfully',
            },
          };
        } catch (error) {
          return {
            data: {
              status: 500,
              message: 'Internal server error',
              error,
            },
          };
        }
      },
    }),
    getCurrencies: builder.query({
      async queryFn() {
        try {
          const currencies = await firestore()
            .collection('currencies')
            .doc('currencies')
            .get();

          const data = currencies.data();
          const currenciesList = Object.values(data).map(item => ({
            label: item.name,
            value: item.code,
          }));

          return {
            data: {
              status: 200,
              message: 'Success',
              data: currenciesList,
            },
          };
        } catch (error) {
          return {
            data: {
              status: 500,
              message: 'Internal server error',
              error,
            },
          };
        }
      },
    }),
  }),
});

export const {
  useGetBankAccountsQuery,
  useGetPaginatedBankAccountsQuery,
  useGetTransferBankAccountQuery,
  useAddBankAccountMutation,
  useGetCurrenciesQuery,
} = bankAccountsApi;
