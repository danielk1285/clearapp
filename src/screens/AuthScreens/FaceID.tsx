import React, {useEffect} from 'react';
import {Button, Text, View} from 'react-native';
import TouchID from 'react-native-touch-id';
import * as Keychain from 'react-native-keychain';
import auth from '@react-native-firebase/auth';
import {s} from 'react-native-size-matters';

const optionalConfigObject = {
  title: 'Authentication Required', // Android
  imageColor: '#e00606', // Android
  imageErrorColor: '#ff0000', // Android
  sensorDescription: 'Touch sensor', // Android
  sensorErrorDescription: 'Failed', // Android
  cancelText: 'Cancel', // Android
  fallbackLabel: 'Show Passcode', // iOS (if available)
  unifiedErrors: false, // use unified error messages (default false)
  passcodeFallback: false, // iOS
};

export const authenticateWithFaceID = async (
  faceIDAuth: boolean,
  setFaceIDAuth: (value) => void,
) => {
  try {
    const biometryType = await TouchID.isSupported(optionalConfigObject);
    if (biometryType === 'FaceID') {
      const success = await TouchID.authenticate(
        'Please authenticate with Face ID',
        optionalConfigObject,
      );
      console.log('Authenticated successfully', success);
      success && setFaceIDAuth(success);
    } else {
      console.log('Face ID not supported');
    }
  } catch (error) {
    console.log('Authentication failed', error);
  }
};

export const checkIfFaceIDEnabled = async () => {
  const biometryType = await TouchID.isSupported(optionalConfigObject);
  if (biometryType === 'FaceID') {
    return true;
  }
  return false;
};

export const FaceID = (faceIDAuth: boolean, setFaceIDAuth: () => void) => {
  useEffect(() => {
    authenticateWithFaceID(faceIDAuth, setFaceIDAuth);
  }, []);

  return (
    <View>
      <Text>Face ID</Text>
      <Button title="Sign Out" onPress={() => auth().signOut()} />
    </View>
  );
};
