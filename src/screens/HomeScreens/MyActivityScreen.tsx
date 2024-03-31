import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {VStack} from 'native-base';
import KeyboardAwareView from '@layouts/KeyboardAwareView/KeyboardAwareView';
import asRoute from 'hoc/asRoute';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import ActivityItem from '@components/ActivityItem/ActivityItem';
import {ActivityItemProps} from '@components/ActivityItem/ActivityItemProps';
import {IActivityCardItem} from '@sections/DashBoardSectons/ActivityCard/ActivityCard.types';

function MyActivityScreen() {
  const [activityData, setActivityData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActivityData = async () => {
      const uid = auth().currentUser?.uid;

      const querySnapshot = await firestore()
        .collection('activity')
        .where('uid', '==', uid)
        .get();
      console.log(querySnapshot);
      const activities = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(activities);
      setActivityData(activities);
      setIsLoading(false);
    };

    fetchActivityData();
  }, []);

  return (
    <KeyboardAwareView>
      <VStack bg="#fff" h="full">
        <ScrollView style={styles.activityList}>
          {activityData.map((activity: ActivityItemProps, index) => (
            <ActivityItem key={index} {...activity} />
          ))}
        </ScrollView>
      </VStack>
    </KeyboardAwareView>
  );
}

const myActivityScreen = asRoute(MyActivityScreen, 'myActivityScreen', {
  title: 'My Activity',
});

const styles = StyleSheet.create({
  activityList: {},
});

export default myActivityScreen;
