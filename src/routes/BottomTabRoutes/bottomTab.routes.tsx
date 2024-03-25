import Header from '@layouts/Header/Header';
import {dashBoardScreen} from '@screens/HomeScreens';
import {profileScreen} from '@screens/ProfileScreens';
import {myWalletScreen} from '@screens/WalletScreens';
import {IReactNavigationRouteConfig} from '@typedef/route.types';

const bottomTabScreen = {
  dashBoardScreen,
  myWalletScreen,
  profileScreen,
};

const bottomRoute: IReactNavigationRouteConfig = {
  initialRouteName: bottomTabScreen.dashBoardScreen.path,
  routes: Object.values(bottomTabScreen),
  screenOptions: {
    headerTitle: '',
    headerShadowVisible: false,
    headerBackTitleVisible: false,
    animation: 'slide_from_right',
    header: props => <Header {...props} />,
  },
};

export type TBottomTabRoutes = keyof typeof bottomTabScreen;

export default bottomRoute;
