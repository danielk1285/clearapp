import Card from '@components/Card/Card';
import {H2} from '@components/Headings/Headings';
import ActivityCardItem from '@components/ActivityCardItem/ActivityCardItem';
import {HStack, Pressable, Text, VStack} from 'native-base';
import React, {useState} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {IActivityCardItem, IActivityCard} from './ActivityCard.types';
import colors from '@theme/colors';
import ActivityDetailModal from '@components/ActivityItem/ActivityDetailModal';
import TransferIcon from '@assets/svg/Transfer';
import YouExchangedIcon from '@assets/svg/YouExchanged';
import WithdrawIcon from '@assets/svg/Withdraw';

export default function ActivityCard({
  title,
  activityList,
  numberOfActivity = activityList.length,
  ...rest
}: any) {
  console.log('rest', rest);

  const activityStatusColor = (statusColor: string) => {
    switch (statusColor) {
      case 'Orange':
        return '#FB8500';
      case 'Green':
        return '#02B134';
      default:
        return 'black';
    }
  };

  return (
    <Card space="4">
      {title ? (
        <HStack justifyContent="space-between">
          <Text color={colors.black} variant="h2">
            {title}
          </Text>
          <Pressable {...rest}>
            <Text fontSize="sm" fontWeight={400} color={colors.primary}>
              See All
            </Text>
          </Pressable>
        </HStack>
      ) : null}
      {activityList?.length > 0 ? (
        activityList?.map((activity, index) => {
          const activityStatusColorString = activityStatusColor(
            activity.status,
          );
          const statusStyle = {
            ...styles.activityStatus,
            color: activityStatusColorString,
          };

          const icon = (type: string) => {
            switch (type) {
              case 'Transfer':
                return <TransferIcon />;
              case 'Exchange':
                return <YouExchangedIcon />;
              case 'Withdrawal':
                return <WithdrawIcon />;
              default:
                return <TransferIcon />;
            }
          };
          const iconComponent = icon(activity.type);
          const currencySymbol = (() => {
            const currencyOrConversion =
              activity.currency || activity.conversionRate;
              console.log('currencyOrConversion', currencyOrConversion);
            switch (currencyOrConversion) {
              case 'USD':
                return '$';
              case 'ILS':
                return '₪';
              case 'EUR':
                return '€';
              case 'GBP':
                return '£';
              default:
                return currencyOrConversion?.replace(/\s/g, '')[0];
            }
          })();
          const currencySymbols = activity?.conversionRate?.match(/[$€£¥₹₪]+/g);

          if (index < numberOfActivity) {
            return (
                <ActivityCardItem
                  key={activity.id}
                  onPress={() => setModalVisible(true)}
                  activity={activity}
                  rest={rest}
                />
            );
          }
        })
      ) : (
        <VStack p="4" alignItems="center" justifyContent="center">
          <Text color={colors.primary} fontSize="sm">
            Your activity history will appear here.
          </Text>
        </VStack>
      )}
    </Card>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    paddingTop: 40,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 19.09,
    textAlign: 'center',
  },
  headerLink: {
    color: 'blue',
  },
  myActivityText: {
    padding: 15,
    fontSize: 16,
    fontWeight: '700',
  },
  activityList: {
    // add your styles here
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  activityItemRight: {
    alignItems: 'flex-end',
  },
  activityContent: {
    marginLeft: 10,
    flex: 1,
  },
  activityStatus: {
    fontWeight: 'bold',
  },
  activityTime: {
    color: 'grey',
    flex: 2,
  },
  dottedLine: {
    width: '100%',
    height: 1,
    borderWidth: 1,
    borderColor: '#D6D6D6',
    borderStyle: 'dotted',
    borderRadius: 1,
  },
  sentAmount: {
    fontWeight: 'bold',
  },
  detailsButton: {
    marginTop: 5,
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  modalContent: {
    width: '100%',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    elevation: 5,
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    alignSelf: 'center',
  },
  modalStatus: {
    marginLeft: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailLabel: {
    color: '#616164',
    flex: 1,
  },
  customerSupport: {
    marginTop: 20,
    color: '#616164',
  },
  contactSupport: {
    textDecorationLine: 'underline',
  },
  detailValue: {
    flex: 1,
    textAlign: 'right',
  },
  dateTimeValue: {
    flex: 2,
  },
  fontBold: {
    fontWeight: 'bold',
  },
});
