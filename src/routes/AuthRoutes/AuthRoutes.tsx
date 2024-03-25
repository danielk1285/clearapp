import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import authRoute from './auth.routes';

export default function AuthRoutes() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={authRoute.screenOptions}
      initialRouteName={authRoute.initialRouteName}>
      {authRoute.routes.map(screen => {
        return (
          <Stack.Screen
            key={screen.path}
            name={screen.path}
            component={screen.component}
            options={screen?.options}
          />
        );
      })}
    </Stack.Navigator>
  );
}
