import messaging from '@react-native-firebase/messaging';
import {GoogleSignin,statusCodes} from '@react-native-google-signin/google-signin';
import React, {useEffect, useState} from 'react';

import auth from '@react-native-firebase/auth';
import {VStack} from 'native-base';
import {Image, Platform} from 'react-native';
import AuthRoutes from './src/routes/AuthRoutes/AuthRoutes';
import UserRoutes from './src/routes/UserRoutes/UserRoutes';

import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {useDispatch} from 'react-redux';
import {login} from './src/store/features/user';

const Stack = createNativeStackNavigator();

export default function Main() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  console.log("User is:"+user);

  useEffect(() => {
    GoogleSignin.configure({
      // webClientId: Config.GOOGLE_ANDROID_CLIENT_ID,
      webClientId:
        '1024747278448-2kfpd9pi1c2matcaq07g6mprobf57jok.apps.googleusercontent.com',
    });
  }, []);

  async function onAuthStateChanged(userInfo: any) {
    if (userInfo) {
      try {
        const userEmail = userInfo.email;
        const splitEmail = userEmail.split('@');
        const username = splitEmail[0];
        const userId = userInfo.uid;

        // check if the user is in the users collection

        const userRef = firestore().collection('users').doc(userId);

        const isUserExist = await userRef.get();

        if (!isUserExist.exists) {
          console.log('user does not exist');
          const email = userInfo.email;
          const firstName = userInfo.displayName.split(' ')[0];
          const lastName = userInfo.displayName.split(' ')[1];
          const profilePicture = userInfo.photoURL;

          // get auth party from the user like apple, google, facebook

          const authProvider = userInfo.providerData[0].providerId;
          let authParty = '';
          if (authProvider === 'google.com') {
            authParty = 'google';
          } else if (authProvider === 'facebook.com') {
            authParty = 'facebook';
          } else if (authProvider === 'apple.com') {
            authParty = 'apple';
          }

          const token = await auth().currentUser?.getIdToken(true);

          const newUser = {
            userid: userId,
            email,
            username,
            firstName: firstName ? firstName : username,
            lastName: lastName ? lastName : '',
            userImage: profilePicture,
            authParty: authParty,
            refreshToken: token,
            kycVerified: 'Not Verified',
          };

          // push user with username

          await firestore().collection('users').doc(userId).set(newUser);
          dispatch(
            login({
              userid: userId,
              email,
              username,
              firstName: firstName ? firstName : username,
              lastName: lastName ? lastName : '',
              userImage: profilePicture,
              authParty: authParty,
            }),
          );
        } else {
          const userData = isUserExist.data();
          dispatch(
            login({
              userid: userData?.userid,
              email: userData?.email,
              username: userData?.username,
              firstName: userData?.firstName,
              lastName: userData?.lastName,
              userImage: userData?.userImage,
              authParty: userData?.authParty,
            }),
          );
        }
      } catch (error) {
        console.log(error);
      }

      setUser(userInfo);
    } else {
      setUser(null);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  React.useEffect(() => {
    const checkPushNotificationPermission = async () => {
      if (Platform.OS === 'ios') {
        try {
          const authStatus = await messaging().requestPermission();
          const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

          if (enabled) {
            console.log('Authorization status:', authStatus);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        const hasPermission = await check(
          PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
        );
        if (
          hasPermission === RESULTS.DENIED ||
          hasPermission === RESULTS.BLOCKED ||
          hasPermission !== RESULTS.UNAVAILABLE
        ) {
          const getPermission = await request(
            PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
          );
          if (getPermission === RESULTS.GRANTED) {
            console.log('Permission granted');
          } else {
            console.log('Permission denied');
          }
        }
      }
    };

    const getFcmToken = async () => {
      await checkPushNotificationPermission();
      try {
        const pushToken = await AsyncStorage.getItem('pushToken');

        if (!pushToken) {
          const fcmToken = await messaging().getToken();
          if (fcmToken) {
            console.log('Your Firebase Token is:', fcmToken);
            await AsyncStorage.setItem('pushToken', fcmToken);
          } else {
            console.log('Failed', 'No token received');
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (user) {
      getFcmToken();
    }
  }, [user]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  if (loading) {
    return (
      <VStack alignItems="center" justifyContent="center" flex={1}>
        <Image
          source={require('./assets/images/doogy-logo.png')}
          style={{height: 200, width: 300}}
        />
      </VStack>
    );
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {user ? (
        <Stack.Screen name="UserRoutes" component={UserRoutes} />
      ) : (
        <Stack.Screen name="AuthRoutes" component={AuthRoutes} />
      )}
    </Stack.Navigator>
  );
}
