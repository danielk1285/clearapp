import React, {useEffect, useState} from 'react';
import {
  NativeScrollEvent,
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
  const [displayCount, setDisplayCount] = useState(10); // Initial number of items to display
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const sortedActivities = activityData.sort((a, b) => {
    return (
      DateTime.fromISO(b['date and time']).toMillis() -
      DateTime.fromISO(a['date and time']).toMillis()
    );
  });
  const endIndex = (currentPage + 1) * itemsPerPage;
  const startIndex = currentPage * itemsPerPage;
  const currentActivities = sortedActivities.slice(startIndex, endIndex);

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

  const handleLoadMore = () => {
    setDisplayCount(prevCount => prevCount + itemsPerPage);
  };

  const handleScroll = ({nativeEvent}: any) => {
    console.log('nativeEvent', nativeEvent);
    const isCloseToBottom =
      nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >=
      nativeEvent.contentSize.height - 50;
    console.log('isCloseToBottom', isCloseToBottom);
    if (isCloseToBottom) {
      handleLoadMore();
    }
  };

  return (
    <>
      <KeyboardAwareView style={styles.container}>
        {/* <VStack bg="#fff" h="full"> */}
        <Text style={styles.headerTitle}>My activity</Text>
        <Text>
          {displayCount} {}
        </Text>
        <ScrollView
          // style={styles.activityList}
          onScroll={handleScroll}
          onScrollBeginDrag={() => console.log('onScrollBeginDrag')}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={true}
          style={{flex: 1, height: 300}}>
          {sortedActivities
            .slice(0, displayCount)
            .map((activity: ActivityItemProps, index) => (
              <ActivityItem
                key={index}
                {...activity}
                toggleBottomTab={toggleBottomTab}
              />
            ))}
        </ScrollView>
        {/* </VStack> */}
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
  activityList: {
  },
  container: {
    flex: 1,
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
  paginationControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  paginationButton: {
    padding: 10,
    marginHorizontal: 20,
    backgroundColor: '#3A41FE', // Use your app's theme color
    borderRadius: 5,
  },
  paginationText: {
    color: '#FFFFFF', // Text color for buttons
  },
  pageIndicator: {
    fontSize: 16,
    color: '#000000', // Text color for the page number
  },
  disabledButton: {
    backgroundColor: '#CCCCCC', // Disabled button color
  },
});

export default myActivityScreen;
