import CardInfo from '@layouts/CardInfo/CardInfo';
import {HStack, Pressable, Text, VStack} from 'native-base';
import React, {useState} from 'react';
import {Animated, StyleSheet} from 'react-native';
import colors from '@theme/colors';
import {IActivityCardItem} from '@sections/DashBoardSectons/ActivityCard/ActivityCard.types';
import moment from 'moment';
import TransferIcon from '@assets/svg/Transfer';
import YouExchangedIcon from '@assets/svg/YouExchanged';
import WithdrawIcon from '@assets/svg/Withdraw';
import ActivityDetailModal from '@components/ActivityItem/ActivityDetailModal';

export default function ActivityCardItem({activity, ...rest}: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalY] = useState(new Animated.Value(300));
  const activityStatusColor = (() => {
    switch (activity?.['status color']) {
      case 'Orange':
        return '#FB8500';
      case 'Green':
        return '#02B134';
      default:
        return 'black';
    }
  })();

  const statusStyle = {
    ...styles.activityStatus,
    color: activityStatusColor,
  };
  console.log('activity', activity);
  const icon = (() => {
    switch (activity.type) {
      case 'Transfer':
        return <TransferIcon />;
      case 'Exchange':
        return <YouExchangedIcon />;
      case 'Withdrawal':
        return <WithdrawIcon />;
      default:
        return <TransferIcon />;
    }
  })();

  const currencySymbol = (() => {
    const currencyOrConversion = activity.currency || activity.conversionRate;
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

  const currencySymbols = activity?.['conversion rate']?.match(/[$€£¥₹₪]+/g);

  const showModal = () => {
    setModalVisible(true);
    Animated.timing(modalY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideModal = () => {
    Animated.timing(modalY, {
      toValue: 300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };
  return (
    <HStack
      alignItems="center"
      bg={colors.bg}
      px="10px"
      pt="16px"
      pb="8px"
      justifyContent="space-between"
      borderRadius="8px">
      <HStack alignItems="center">
        {/* <CardInfo mb="0px" icon={activity.icon} bg="#ffffff" /> */}
        {icon}
        <VStack ml="10px" space={2} pb="2px">
          <Text
            fontWeight={700}
            color={
              activity.status !== 'You Exchanged' ? colors.green : colors.black
            }>
            {activity.status}
          </Text>
          {moment(activity.date).isValid() && (
            <Text fontSize="xs" color={colors.gray[0]}>
              {moment(activity.date).fromNow()}
            </Text>
          )}
        </VStack>
      </HStack>
      <VStack space={2} pb="2px">
        <Text textAlign="right" fontWeight={700} color={colors.black}>
          {activity.amount}
        </Text>
        <Pressable {...rest} onPress={showModal}>
          <Text textAlign="right" fontSize="xs" color={colors.primary}>
            View Details
          </Text>
        </Pressable>
      </VStack>
      <ActivityDetailModal
        modalVisible={modalVisible}
        hideModal={hideModal}
        modalY={modalY}
        type={activity.type}
        status={activity.status}
        statusStyle={statusStyle}
        icon={icon}
        sentAmount={
          activity.amount.replace(/[^0-9.]/g, '') || activity.amount
        }
        exchangeAmount={activity?.['exchange amount']}
        dateTime={moment(activity?.['date and time']).toISOString()}
        conversionRate={activity?.['conversion rate']}
        currencySymbols={currencySymbols}
        currencySymbol={currencySymbol}
      />
    </HStack>
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
