import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {IReactNavigationRoute} from '@typedef/route.types';
import React from 'react';

export default function asRoute(
  Component: React.ComponentType<any>,
  routeName: string,
  options?: NativeStackNavigationOptions,
): IReactNavigationRoute {
  return {
    path: routeName,
    component: Component,
    options: options,
  };
}
