import Header from '@layouts/Header/Header';
import onBoardingScreen from '@screens/AuthScreens/OnBoardingScreen';
import {IReactNavigationRouteConfig} from '@typedef/route.types';
import React from 'react';

const authScreens = {
  onBoardingScreen,
};

const authRoute: IReactNavigationRouteConfig = {
  initialRouteName: authScreens.onBoardingScreen.path,
  routes: Object.values(authScreens),
  screenOptions: {
    headerTitle: '',
    headerShadowVisible: false,
    headerBackTitleVisible: false,
    header: props => <Header {...props} />,
    animation: 'slide_from_right',
  },
};

export type TAuthRoutes = keyof typeof authScreens;

export default authRoute;
