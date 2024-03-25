import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Main from './Main';
import theme from './src/theme/config';
import store, {persistor} from './src/store/index';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import messaging from '@react-native-firebase/messaging';

export default function App() {
  /*React.useEffect(() => {
    async function registerAppWithFCM() {
      await messaging().registerDeviceForRemoteMessages();
    }
    registerAppWithFCM();
  }, []);*/
  return (
    <NativeBaseProvider theme={theme}>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
              <Main />
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}
