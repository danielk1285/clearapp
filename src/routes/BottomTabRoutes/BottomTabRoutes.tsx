import Header from '@layouts/Header/Header';
import RenderBottomTabs from '@layouts/RenderBottomTabIcons/RenderBottomTabs';
import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {fontConfig} from '@theme/fontConfig';
import React from 'react';
import bottomRoute from './bottomTab.routes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function BottomTabNavigator() {
  const Tab = createBottomTabNavigator();
  const insets = useSafeAreaInsets();

  const tabbarOptions = React.useCallback(
    ({route, inset}: {route: any; inset: number}) => ({
      headerShadowVisible: false,
      tabBarStyle: {
        paddingTop: 10,
        paddingBottom: 10,
        height: 60 + inset,
      },
      tabBarIconStyle: {
        marginTop: 10,
      },
      tabBarLabelStyle: {
        paddingTop: 12,
        fontFamily: fontConfig.SfPro[400].normal,
      },
      tabBarIcon: props => (
        <RenderBottomTabs routeName={route.name} focused={props.focused} />
      ),
      tabBarShowLabel: false,

      tabBarHideOnKeyboard: true,
      animation: 'slide_from_right',
      header: props => <Header hideBackButton {...props} />,
    }),
    [],
  );

  return (
    <Tab.Navigator
      screenOptions={({route}: BottomTabBarProps) =>
        tabbarOptions({route, inset: insets.bottom})
      }
      initialRouteName={bottomRoute.initialRouteName}>
      {bottomRoute.routes.map((screen: any) => {
        return (
          <Tab.Screen
            key={screen.path}
            name={screen.path}
            component={screen.component}
            options={screen?.options}
          />
        );
      })}
    </Tab.Navigator>
  );
}
