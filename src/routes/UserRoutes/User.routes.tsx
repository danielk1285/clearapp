import Header from '@layouts/Header/Header';
import {IReactNavigationRouteConfig} from '@typedef/route.types';

import {
  editProfileScreen,
  languageScreen,
  notificationScreen,
  privacyPolicyScreen,
  securityScreen,
} from '@screens/ProfileScreens/index';

import {
  accountListScreen,
  addFundStep1Screen,
  addFundStep2Screen,
  addFundStep3Screen,
  exchangeOptionScreen,
  exchangeScreen,
  exchangeSummaryScreen,
  withdrawProgressScreen,
  withdrawScreen,
  withdrawSummaryScreen,
} from '@screens/WalletScreens/index';

import BottomTabNavigator from '@routes/BottomTabRoutes/BottomTabRoutes';
import {
  addAccountScreen,
  addNewAccountScreen,
  businessDetailsStep1Screen,
  businessDetailsStep2Screen,
  businessDetailsStep3Screen,
  detailsScreen,
  fundDetailsScreen,
  identityDetailsScreen,
  myActivityScreen,
  transferSourceScreen,
  uploadFundInfoScreen,
  personalDetails,
} from '@screens/HomeScreens/index';
import asRoute from 'hoc/asRoute';

const walletScreens = {
  accountListScreen,
  exchangeScreen,
  exchangeOptionScreen,
  exchangeSummaryScreen,
  withdrawSummaryScreen,
  withdrawProgressScreen,
  withdrawScreen,
  addFundStep1Screen,
  addFundStep2Screen,
  addFundStep3Screen,
  personalDetails,
};

const profileScreens = {
  editProfileScreen,
  notificationScreen,
  languageScreen,
  privacyPolicyScreen,
  securityScreen,
};

const homeScreens = {
  transferSourceScreen,
  detailsScreen,
  addAccountScreen,
  addNewAccountScreen,
  fundDetailsScreen,
  uploadFundInfoScreen,
  identityDetailsScreen,
  businessDetailsStep1Screen,
  businessDetailsStep2Screen,
  businessDetailsStep3Screen,
  myActivityScreen,
};

const tabScreen = asRoute(BottomTabNavigator, 'tabScreen', {
  headerShown: false,
});

const userScreens = {
  ...walletScreens,
  ...profileScreens,
  ...homeScreens,
  tabScreen,
};

const userRoutes: IReactNavigationRouteConfig = {
  initialRouteName: userScreens.tabScreen.path,
  routes: Object.values(userScreens),
  screenOptions: {
    headerTitle: '',
    headerShadowVisible: false,
    headerBackTitleVisible: false,
    header: props => <Header {...props} />,
    animation: 'slide_from_right',
  },
};

export type TUserRoutes = keyof typeof userScreens;

export default userRoutes;
