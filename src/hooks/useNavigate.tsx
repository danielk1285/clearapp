import {NavigationContext} from '@react-navigation/native';
import {TAuthRoutes} from '@routes/AuthRoutes/auth.routes';
import {TBottomTabRoutes} from '@routes/BottomTabRoutes/bottomTab.routes';
import {TUserRoutes} from '@routes/UserRoutes/User.routes';
import React from 'react';

type TRoutes = TAuthRoutes | TBottomTabRoutes | TUserRoutes;
type TNavigationType = 'push' | 'replace' | 'goBack' | 'navigate';

type TUseNavigate = (
  screen?: TRoutes,
  params?: any,
  type?: TNavigationType,
) => void;

export default function useNavigate(): TUseNavigate {
  const navigation = React.useContext(NavigationContext);
  const navigate = (screen?: TRoutes, params?: any, type?: TNavigationType) => {
    switch (type) {
      case 'push':
        return navigation?.push(screen as string, params);
      case 'replace':
        return navigation?.replace(screen as string, params);
      case 'goBack':
        return navigation?.goBack();
      default:
        return navigation?.navigate(screen as string, params);
    }
  };
  return navigate;
}
