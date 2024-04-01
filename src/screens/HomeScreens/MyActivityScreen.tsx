import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {HStack, VStack} from 'native-base';
import KeyboardAwareView from '@layouts/KeyboardAwareView/KeyboardAwareView';
import asRoute from 'hoc/asRoute';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import ActivityItem from '@components/ActivityItem/ActivityItem';
import {ActivityItemProps} from '@components/ActivityItem/ActivityItemProps';
import {DateTime} from 'luxon';
import {HomeFillIcon, ProfileIcon, WalletIcon} from '@assets/svg/icons';
import useNavigate from '@hooks/useNavigate';
import {TUserRoutes} from '@routes/UserRoutes/User.routes';

function MyActivityScreen() {
  const [activityData, setActivityData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hideBottomTab, setHideBottomTab] = useState(false);
  const navigate = useNavigate();

  const sortedActivities = activityData.sort((a, b) => {
    return (
      DateTime.fromISO(b['date and time']).toMillis() -
      DateTime.fromISO(a['date and time']).toMillis()
    );
  });

  useEffect(() => {
    const fetchActivityData = async () => {
      const uid = auth().currentUser?.uid;

      const querySnapshot = await firestore()
        .collection('activity')
        .where('uid', '==', uid)
        .get();
      const activities = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setActivityData(activities);
      setIsLoading(false);
    };

    fetchActivityData();
  }, []);

  const toggleBottomTab = () => {
    console.log('toggleBottomTab');
    setHideBottomTab(!hideBottomTab);
  };

  const bottomIcons = [
    {Icon: HomeFillIcon, title: 'Home', path: 'dashBoardScreen'},
    {Icon: WalletIcon, title: 'Wallet', path: 'myWalletScreen'},
    {Icon: ProfileIcon, title: 'Profile', path: 'profileScreen'},
  ];

  return (
    <>
      <KeyboardAwareView style={styles.container}>
        <VStack bg="#fff" h="full">
          <Text style={styles.headerTitle}>My activity</Text>
          <ScrollView style={styles.activityList}>
            {sortedActivities.map((activity: ActivityItemProps, index) => (
              <ActivityItem
                key={index}
                {...activity}
                toggleBottomTab={toggleBottomTab}
              />
            ))}
          </ScrollView>
        </VStack>
      </KeyboardAwareView>
      {/* This is necessary due to how messy the bottom tab navigation was implemented... */}
      {!hideBottomTab && (
        <View style={styles.tabBar}>
          {bottomIcons.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.tabButton}
              onPress={() => navigate(item.path as TUserRoutes)}>
              {item.Icon && <item.Icon style={styles.tabIcon} />}
              <Text style={styles.tabTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
}

const myActivityScreen = asRoute(MyActivityScreen, 'myActivityScreen', {
  title: 'My Activity',
});

const styles = StyleSheet.create({
  activityList: {},
  container: {
    flexGrow: 1,
    backgroundColor: '#F7F7F7',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 19.09,
    marginLeft: 15,
    marginTop: 15,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    width: '100%',
    backgroundColor: '#fff',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    tintColor: '#3A41FE',
    height: 20,
    width: 20,
  },
  tabTitle: {
    color: '#3A41FE',
  },
});

export default myActivityScreen;
