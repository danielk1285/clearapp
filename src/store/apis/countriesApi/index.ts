import {apiSlice} from '../index';
import firestore from '@react-native-firebase/firestore';

export const countriesApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCountries: builder.query({
      async queryFn() {
        try {
          const countries = await firestore()
            .collection('countries')
            .get()
            .then(querySnapshot => {
              const keys = querySnapshot.docs.map(doc => ({
                value: doc.id,
                label: doc.data().name,
              }));

              return keys;
            });

          return {
            data: {
              status: 200,
              message: 'Got countries successfully',
              data: countries,
            },
          };
        } catch (error) {
          return {
            data: {
              status: 500,
              message: 'Internal server error',
            },
          };
        }
      },
    }),
    getStatesByCountry: builder.query({
      queryFn: async (countryName: string) => {
        try {
          const states = await firestore()
            .collection('countries')
            .doc(countryName)
            .collection('states')
            .get();

          const statesData = states.docs.map(doc => {
            return {
              value: doc.id,
              label: doc.data().name,
            };
          });

          return {
            data: {
              status: 200,
              message: 'User information updated successfully',
              data: statesData,
            },
          };
        } catch (error) {
          return {
            data: {
              status: 500,
              message: 'Internal server error',
            },
          };
        }
      },
    }),
    getCityByState: builder.query({
      queryFn: async ({
        countryName,
        stateName,
      }: {
        countryName: string;
        stateName: string;
      }) => {
        console.log('countryName', countryName, 'stateName', stateName);
        try {
          const res = await firestore()
            .collection('countries')
            .doc(countryName)
            .collection('states')
            .doc(stateName)
            .get();

          const citiesData = res.data();

          const cities = citiesData?.cities.map((city: any) => ({
            label: city,
            value: city,
          }));

          return {
            data: {
              status: 200,
              message: 'User information updated successfully',
              data: cities,
            },
          };
        } catch (error) {
          return {
            data: {
              status: 500,
              message: 'Internal server error',
            },
          };
        }
      },
    }),
    getBanksByCountry: builder.query({
      queryFn: async ({countryName}: {countryName: string}) => {
        try {
          const banks = await firestore()
            .collection('countries')
            .doc(countryName)
            .get();
          const bankList = banks.data()?.banks || [];
         const data = bankList.map(doc => {
            return {
              value: doc,
              label: doc,
            };
          });

          return {
            data: {
              status: 200,
              message: 'User information updated successfully',
              data,
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
  useGetCountriesQuery,
  useGetStatesByCountryQuery,
  useGetCityByStateQuery,
  useGetBanksByCountryQuery,
} = countriesApi;
