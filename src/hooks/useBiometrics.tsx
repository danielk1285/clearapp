import React from 'react';
import { Button, Platform } from 'react-native';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

const BiometricAuth = () => {
  const handleBiometricAuth = async () => {
    // Ensure the code runs only on iOS
    if (Platform.OS === 'ios') {
      const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: false });
      const { available, biometryType } = await rnBiometrics.isSensorAvailable();

      if (available && biometryType === BiometryTypes.FaceID) {
        console.log('FaceID is available');
        rnBiometrics.simplePrompt({ promptMessage: 'Authenticate' })
          .then(() => {
            console.log('Authenticated with FaceID');
            // Handle successful authentication
          })
          .catch(error => {
            console.error('Authentication failed', error);
          });
      } else {
        console.log('FaceID not available or not supported');
      }
    } else {
      console.log('This feature is only available on iOS');
    }
  };

  return (
    <Button title="Authenticate with FaceID" onPress={handleBiometricAuth} />
  );
};

export default BiometricAuth;
