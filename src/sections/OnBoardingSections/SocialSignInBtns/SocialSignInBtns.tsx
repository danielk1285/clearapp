import React from 'react';
import CustomLoginButton from '@components/CustomLoginButton/CustomLoginButton';
import {VStack} from 'native-base';
import {Alert} from 'react-native'; // Add this line

import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import {appleAuth} from '@invertase/react-native-apple-authentication';

export default function SocialSignInBtns() {
  
  async function onFacebookButtonPress() {
    try{
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
  
    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken();
  
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
  
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }catch(error){
    console.log(error); 
  }
}

  async function onGoogleButtonPress() {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      console.log(googleCredential);
      // Sign-in the user with the credential
      auth().signInWithCredential(googleCredential);
    } catch (error) {
      // alert('Error' + '' + error?.message);
      console.log(error);
    }
  }

  async function onAppleButtonPress () {
    try {
      console.log("Clicked on Apple button");
     // Start the sign-in request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    // As per the FAQ of react-native-apple-authentication, the name should come first in the following array.
    // See: https://github.com/invertase/react-native-apple-authentication#faqs
    requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
  });

  // Ensure Apple returned a user identityToken
  if (!appleAuthRequestResponse.identityToken) {
    throw new Error('Apple Sign-In failed - no identify token returned');
  }

  // Create a Firebase credential from the response
  const { identityToken, nonce } = appleAuthRequestResponse;
  const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

  // Sign the user in with the credential
  return auth().signInWithCredential(appleCredential);
  } catch (error) {
    console.log(error);
  }
  }
  async function revokeSignInWithAppleToken() {
    try {
      console.log("Clicked on Apple button");
    // Get an authorizationCode from Apple
    const { authorizationCode } = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.REFRESH,
    });
  
    // Ensure Apple returned an authorizationCode
    if (!authorizationCode) {
      throw new Error('Apple Revocation failed - no authorizationCode returned');
    }
  
    // Revoke the token
    return auth().revokeToken(authorizationCode);
  } catch (error) {
    console.log(error);
  }
  }
  const socialButtons = [
    {
      name: 'apple',
      title: 'Continue with Apple',
      onPress: onAppleButtonPress,
    },
    {
      name: 'google',
      title: 'Continue with Google',
      onPress: onGoogleButtonPress,
    },
    {
      name: 'facebook',
      title: 'Continue with Facebook',
      onPress: onFacebookButtonPress,
    },
  ];

  const buttons = socialButtons.map(button => (
    <CustomLoginButton
      key={button.name}
      name={button.name}
      title={button.title}
      onPress={button.onPress}
    />
  ));

  return <VStack space={4}>{buttons}</VStack>;
}
