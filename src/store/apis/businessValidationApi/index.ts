import {apiSlice} from '../index';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

export const businessValidation = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getBusinessValidationStatus: builder.query({
      async queryFn() {
        try {
          const userName = auth().currentUser?.uid;

          const userDoc = await firestore()
            .collection('users')
            .doc(userName)
            .get();

          const userObject = userDoc.data();

          return {
            data: {
              status: 200,
              message: 'User information updated successfully',
              data: {
                hasVerified: userObject?.kycVerified,
              },
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
    businessValidationStep1: builder.mutation({
      async queryFn(args: {
        firstName: string;
        lastName: string;
        phone: string;
      }) {
        try {
          const userName = auth().currentUser?.uid;

          const userDoc = await firestore()
            .collection('users')
            .doc(userName)
            .get();

          const userObject = userDoc.data();

          const updatedUserObject = {
            ...userObject,
            ...args,
          };

          await firestore()
            .collection('users')
            .doc(userName)
            .set(updatedUserObject);

          return {
            data: {
              status: 200,
              message: 'User information updated successfully',
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
    businessValidationStep2: builder.mutation({
      async queryFn(args: {
        addressLine1: string;
        addressLine2: string;
        city: string;
        country: string;
        state: string;
        zipCode: string;
      }) {
        try {
          const userName = auth().currentUser?.uid;

          const userDoc = await firestore()
            .collection('users')
            .doc(userName)
            .get();

          const userObject = userDoc.data();

          const userAddress = {
            kycAddressLine1: args.addressLine1,
            kycAddressLine2: args.addressLine2,
            kycState: args.state,
            kycCity: args.city,
            kycCountry: args.country,
            kycZipcode: args.zipCode,
          };

          const updatedUserObject = {
            ...userObject,
            ...userAddress,
          };

          await firestore()
            .collection('users')
            .doc(userName)
            .set(updatedUserObject);

          return {
            data: {
              status: 200,
              message: 'User address updated successfully',
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
    businessValidationStep3: builder.mutation({
      async queryFn(args: {
        idType: string;
        idImageName: string;
        idImagePath: string;
        homeValidationType: string;
        homeValidationImageName: string;
        homeValidationImagePath: string;
      }) {
        try {
          const userName = auth().currentUser?.uid;

          const userDoc = await firestore()
            .collection('users')
            .doc(userName)
            .get();

          const userObject = userDoc.data();

          const idImageRef = storage().ref('idImages/' + args.idImageName);

          await idImageRef.putFile(args.idImagePath);

          const idImageUrl = await idImageRef.getDownloadURL();

          const homeValidationImageRef = storage().ref(
            'homeValidationImages/' + args.homeValidationImageName,
          );

          await homeValidationImageRef.putFile(args.homeValidationImagePath);

          const homeValidationImageUrl =
            await homeValidationImageRef.getDownloadURL();

          const userInfo = {
            kycIDType: args.idType,
            kycIdentificationLink: idImageUrl,
            kycHomeAddressConfirmationLink: homeValidationImageUrl,
            home_address_confirmation_type: args.homeValidationType,
          };

          const updatedUserObject = {
            ...userObject,
            ...userInfo,
          };

          await firestore()
            .collection('users')
            .doc(userName)
            .set(updatedUserObject);

          return {
            data: {
              status: 200,
              message: 'User address updated successfully',
            },
          };
        } catch (error) {
          return {
            data: {
              status: 500,
              message: 'Internal server error',
              error: error,
            },
          };
        }
      },
    }),
  }),
});

export const {
  useBusinessValidationStep1Mutation,
  useBusinessValidationStep2Mutation,
  useBusinessValidationStep3Mutation,
  useGetBusinessValidationStatusQuery,
} = businessValidation;
