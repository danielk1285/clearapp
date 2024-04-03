import useNavigate from '@hooks/useNavigate';
import ActivityCard from '@sections/DashBoardSectons/ActivityCard/ActivityCard';
import DashboardUserProfile from '@sections/DashBoardSectons/DashboardUserProfile/DashboardUserProfile';
import ExchangeNowCard from '@sections/DashBoardSectons/ExchangeNowCard/ExchangeNowCard';
import StartExchange from '@sections/DashBoardSectons/StartExchange';
import asRoute from 'hoc/asRoute';
import {ScrollView, VStack} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import auth, {firebase} from '@react-native-firebase/auth';
import {useSelector} from 'react-redux';
import {selectUser} from '@store/features/user';
import {useGetUserActivityQuery} from '@store/apis/userActivitiesApi';
import { useNavigation } from '@react-navigation/native';
/*export const activityData = [
  {
    id: 1,
    status: 'Approving1122',
    date: new Date(),
    icon: 'moneySend',
    amount: 'Sent 32,500 ₪',
  },
  {
    id: 2,
    status: 'Transfer Complete',
    date: new Date(2022),
    icon: 'moneyExchange',
    amount: '$ 10,000',
  },
  {
    id: 3,
    status: 'You Exchanged',
    date: new Date(),
    icon: 'moneyExchange',
    amount: '$ 10,000',
  },
  {
    id: 4,
    status: 'Approving111',
    date: new Date(),
    icon: 'moneySend',
    amount: 'Sent 32,500 ₪',
  },
  {
    id: 5,
    status: 'Transfer Complete',
    date: new Date(2022),
    icon: 'moneyExchange',
    amount: '$ 10,000',
  },
  {
    id: 6,
    status: 'You Exchanged',
    date: new Date(),
    icon: 'moneyExchange',
    amount: '$ 10,000',
  },
];
*/


function DashBoardScreen() {
  //const [activityList, setActivityList] = useState(activityData);
  const user = useSelector(selectUser);
  const {data: activityData, isLoading: activityIsLoading} = useGetUserActivityQuery(undefined);
  console.log(activityData, activityIsLoading);

  const [currentUser, setCurrentUser] = useState({
    name: '',
    balance: 0,
    userAvatar: '',
  });

  const navigation = useNavigation();

  const handleAddFunds = () => {
    console.log('Handle AddFunds');
  };

  const handleSeeAllActivity = () => {
    navigation.navigate('myActivityScreen' as never);
  };

  React.useEffect(() => {
    console.log("Dashboardscreen tsx");

    const userData = auth().currentUser;
    if (userData) {
      setCurrentUser({
        name: userData.displayName,
        balance: 0,
        userAvatar: userData.photoURL,
      });
      if (!activityIsLoading && activityData) {
        console.log('activityData123');
      }
    }
  }, [activityData, activityIsLoading]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="handled">
      <DashboardUserProfile
        name={currentUser.name}
        balance={currentUser.balance}
        onAddBalance={handleAddFunds}
        userAvatar={
          currentUser.userAvatar ||
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
        }
      />

      <StartExchange />

      <VStack space="4" py="40px" px={4}>
        <ExchangeNowCard title="If you exchange now you will" />
        <ActivityCard
          title="My activity"
          onPress={handleSeeAllActivity}
          activityList={activityData?.activityData || []}
          numberOfActivity={4}
        />
      </VStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F7F7F7',
  },
});

const dashBoardScreen = asRoute(DashBoardScreen, 'dashBoardScreen', {
  headerShown: false,
  title: 'Home',
});

export default dashBoardScreen;
