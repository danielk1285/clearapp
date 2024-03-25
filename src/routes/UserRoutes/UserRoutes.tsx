import React from 'react';
import {Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import userRoutes from './User.routes';

const UserRoutes = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={userRoutes.screenOptions}
      initialRouteName={userRoutes.initialRouteName}>
      {userRoutes.routes.map(screen => {
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
};

export default UserRoutes;
