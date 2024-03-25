import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
//import { useState } from 'react';

/*const [activities, setActivities] = useState([]);
const [lastVisible, setLastVisible] = useState(null);
const [loading, setLoading] = useState(false);
*/
import {apiSlice} from '../index';
const transformData = (doc) => {
  return {
    id: doc.transferRef, // Assuming transferRef can be converted to a number
    status: doc.status,
    date: new Date(doc.date),
    icon: doc.icon,
    amount: doc["sent amount"] + " " + doc.currency
  };
}
export const userActivitiesApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUserActivity: builder.query({
      async queryFn() {
        try {
        const user = auth().currentUser;
        if (!user) {
          throw new Error('User not found');
        } else {
          const username = user.uid;
          //const testAcc = 'test_user_11ewo7GQZW'; Here for testing perpose
          console.log('This is where I get the activiy name');
          console.log('user1name', username);
  
        const querySnapshot = await firestore()
          .collection('activity')
          .where('uid', '==', username)
          .orderBy('date and time', 'desc')
          .limit(4) // Limit the number of documents to 4
          .get();
          
          const fetchedActivities = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          const transformedFetchedActivities = fetchedActivities.map(transformData);
          console.log('fetchedActivities', fetchedActivities);
          console.log('transformedfetchedActivities', transformedFetchedActivities);
          return {
            data: {
              status: 200,
              message: 'Got user activity successfully',
              activityData: transformedFetchedActivities
            },
          };

        }
      } catch (error) {
        console.error('fetchedActivities', error);
        return {
          data: {
            status: 500,
            message: 'Internal server error',
          },
        }
      }
      },
    }),
    getPaginatedUserActivity: builder.query({
      async queryFn({page = 1, limit = 10}: {page?: number; limit?: number}) {
        try {
          console.log('This is where I get the paginated activity name. Page:', page, 'Limit:', limit);
          const user = auth().currentUser;
          if (!user) {
            throw new Error('User not found');
          } else {
            const username = user.uid;
            //const testAcc = 'test_user_11ewo7GQZW'; Here for testing perpose
            
            let querySnapshot = firestore()
              .collection('activity')
              .where('uid', '==', username)
              .orderBy('createdAt', 'desc')
              .limit(limit);
            
              if (lastVisible) {
                querySnapshot = querySnapshot.startAfter(lastVisible);
              }
            const documentSnapshots = await querySnapshot.get();  
            const fetchedActivities = documentSnapshots.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const lastVisibleActivity = 1;//fetchedActivities[fetchedActivities.length - 1];

            //setActivities(prevState => [...prevState, ...documentData]);
            setLastVisible(lastVisibleActivity);
            return {
              data: {
                status: 200,
                message: 'Got user paginated activity successfully',
                activityData: fetchedActivities || [],
              }
              
            };
          }
        } catch (error) {
          console.error(error);
          return {
            data: {
              status: 500,
              message: 'Internal server error',
            },
          };
          //throw error;
        }
      },
    }),
  }),
});

export const {
  useGetUserActivityQuery,
  useGetPaginatedUserActivityQuery,
} = userActivitiesApi;

