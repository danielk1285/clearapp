import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export interface IReactNavigationRoute {
  path: string;
  component: React.ComponentType<any>;
  options?: NativeStackNavigationOptions;
}

export interface IReactNavigationRoutes {
  [key: string]: IReactNavigationRoute;
}

export interface IReactNavigationRouteConfig {
  initialRouteName: string;
  routes: IReactNavigationRoute[];
  screenOptions: NativeStackNavigationOptions;
}
