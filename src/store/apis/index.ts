import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react';
import {getConverstionRate} from '@utils/getConversionRates';

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fakeBaseQuery({}),
  endpoints: builder => ({
    getConversionRates: builder.query({
      async queryFn() {
        try {
          const currenciesResponse = await firestore()
            .collection('currencies')
            .doc('currencies')
            .get();

          const latestRatesResponse = await firestore()
            .collection('latestrates')
            .doc('rates')
            .get();

          const currenciesObject = currenciesResponse.data();
          const latestRatesObject = latestRatesResponse.data();

          // Assuming `firestoreTimestamp` is a Firestore Timestamp
          let firestoreTimestamp = latestRatesResponse.data()?.updateddate;

          // Convert to JavaScript Date object
          let date = firestoreTimestamp ? firestoreTimestamp.toDate() : null;

          // Convert to string
          let dateString = date ? date.toString() : null;

          const currencies = Object.values(currenciesObject as any) as any[];

          const currenciesWithConversion = [];

          for (let i = 0; i < currencies.length; i++) {
            const currencyCode = currencies[i].code;
            const currencyName = currencies[i].name;
            const currencySymbol = currencies[i].symbol;
            let flag = '';
            try {
              const flagReference = storage().ref(currencies[i].flag);
              console.log(currencies[i].flag);
              flag = await flagReference.getDownloadURL();
            } catch (error) {
              console.log(error);
            }

            const  conversionRates  = getConverstionRate(
              currencyCode,
              latestRatesObject as any,
            );

            const decimalDigits = currencies[i].decimal_digits;

            currenciesWithConversion.push({
              currencyCode: currencyCode,
              currencyName,
              currencySymbol,
              flag,
              conversionRates: conversionRates,
              decimalDigits,
              updatedDate: dateString
            });
          }

          // return promise
          return {
            data: {
              currencies: currenciesWithConversion,
              status: 200,
              message: 'Success',
            },
          };
        } catch (error) {
          console.log(error);
          return {
            error: {
              data: {
                message: 'Something went wrong',
                status: 500,
                data: null,
              },
            },
          };
        }
      },
    }),
    insertImage: builder.mutation({
      async queryFn({
        image,
        imageName,
        folderName = 'images',
      }: {
        image: string;
        imageName: string;
        folderName?: string;
      }) {
        try {
          const reference = storage().ref(`${folderName}/${imageName}`);
          await reference.putFile(image);
          const url = await reference.getDownloadURL();
          return {
            data: {
              status: 200,
              message: 'Image uploaded successfully',
              data: url,
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
  tagTypes: ['getProfileDetails'],
});

export const {useGetConversionRatesQuery, useInsertImageMutation} = apiSlice;
