import {firebase} from '@react-native-firebase/auth';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';

const baseQuery = fetchBaseQuery({
  baseUrl: Config.API_URL,
  credentials: 'include',
  prepareHeaders: async headers => {
    const token = await firebase.auth().currentUser?.getIdToken(true);
    if (token) {
      // headers.set('Authorization', `Bearer ${token}`);
      headers.set('authorization', `Bearer ${token}`);
      console.log('API_URL', Config.API_URL);
      console.log('headers', headers);
      console.log(headers.get('authorization'));

      // headers.set('Content-Type', 'application/json');
      // headers.set('Accept', 'application/json');
    }
    console.log('token', token);
    return headers;
  },
});

export const apiV2Slice = createApi({
  reducerPath: 'apiV2Slice',
  baseQuery: baseQuery,
  endpoints: builder => ({}),
});
