import {IAddFunds} from '@typedef/common.types';
import {apiV2Slice} from './index';
import {bankAccountsApi} from '@store/apis/bankAccounntsApi';

const newApiV2 = apiV2Slice.injectEndpoints({
  endpoints: builder => ({
    createOrUpdateUser: builder.mutation({
      query: user => ({
        url: 'createOrUpdateUser',
        method: 'POST',
        body: user,
      }),
      async onQueryStarted({user}, {dispatch, queryFulfilled}) {
        const result = await queryFulfilled;
        dispatch(
          bankAccountsApi.endpoints.getBankAccounts.initiate({ page: 1, limit: 5 }, {
            subscribe: false,
            forceRefetch: true,
          }),
        );
      },
    }),
    initiateWithdrawal: builder.mutation({
      query: body => {
        console.log('Sending withdrawal request with body:', body);
        return {
          url: 'initiateWithdrawal',
          method: 'POST',
          body: body,
        };
      },
    }),
    
    handleTransactionsds: builder.mutation({
      query: body => ({
        url: 'addTransferRequest',
        method: 'POST',
        body: body,
      }),
    }),
  }),
});

export const {useCreateOrUpdateUserMutation, useHandleTransactionsdsMutation, useInitiateWithdrawalMutation} =
  newApiV2;
