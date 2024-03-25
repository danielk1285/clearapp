import {apiSlice} from '../index';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

export const userValidation = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUserValidationStatus: builder.query({
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
    validateUserPersonalDetails: builder.mutation({
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
    validateUserAddressDetails: builder.mutation({
      async queryFn(args: {
        addressLine1: string;
        addressLine2: string;
        city: string;
        country: string;
        state: string;
        zipCode: string;
      }) {
        try {
          const userName = auth().currentUser?.email?.toString()?.split('@')[0];

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
    validateUserIdentityDetails: builder.mutation({
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
    updateUserProfile: builder.mutation({
      async queryFn(args: {
        firstName: string;
        lastName: string;
        phone: string;
        birthDay: string;
        country: string;
        organizationDescription: string;
        email: string;
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
      invalidatesTags: ['getProfileDetails'],
    }),
    getUserProfile: builder.query({
      async queryFn() {
        try {
          const userName = auth().currentUser?.uid;
          console.log(userName);

          const userDoc = await firestore()
            .collection('users')
            .doc(userName)
            .get();

          const userObject = userDoc.data();

          console.log(userObject);

          return {
            data: {
              status: 200,
              message: 'User information updated successfully',
              data: {
                firstName: userObject?.firstName,
                lastName: userObject?.lastName,
                phone: userObject?.phone,
                birthDay: userObject?.birthDay,
                country: userObject?.country,
                organizationDescription: userObject?.organizationDescription,
                email: userObject?.email,
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
      providesTags: ['getProfileDetails'],
    }),
  }),
});

export const {
  useValidateUserPersonalDetailsMutation,
  useValidateUserAddressDetailsMutation,
  useValidateUserIdentityDetailsMutation,
  useGetUserValidationStatusQuery,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} = userValidation;
