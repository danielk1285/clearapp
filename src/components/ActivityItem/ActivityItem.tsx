import {StyleSheet, Text, View} from 'react-native';
import {DateTime} from 'luxon';
import ApprovingIcon from '@assets/svg/Approving';
import YouExchangedIcon from '@assets/svg/YouExchanged';
import TransferCompleteIcon from '@assets/svg/TransferComplete';
import {ActivityItemProps} from './ActivityItemProps';
import {IActivityCardItem} from '@sections/DashBoardSectons/ActivityCard/ActivityCard.types';

const ActivityItem: React.FC<ActivityItemProps> = ({
  status,
  'sent amount': sentAmount = '',
  'date and time': dateTime = '',
  'status color': statusColor = '',
  type,
  currency,
  'conversion rate': conversionRate = '',
}) => {
  // Determine the icon and text color based on the status
  const activityStatusColor = (() => {
    switch (statusColor) {
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

  const icon = (() => {
    switch (status) {
      case 'Approving':
        return <ApprovingIcon />;
      case 'In progress':
        return <ApprovingIcon />;
      case 'You Exchanged':
        return <YouExchangedIcon />;
      case 'Transfer Complete':
        return <TransferCompleteIcon />;
      case 'Complete':
        return <TransferCompleteIcon />;
      default:
        return <View />;
    }
  })();

  const displayTime = DateTime.fromISO(dateTime).toRelative();
  const currencySymbol = (() => {
    const currencyOrConversion = currency || conversionRate;
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
        // replace spaces with empty string
        return currencyOrConversion.replace(/\s/g, '')[0];
    }
  })();
  console.log('currency', currency);
  console.log('conversionRate', currencySymbol);

  return (
    <View style={styles.activityItem}>
      {icon}
      <View style={styles.activityContent}>
        <Text style={[statusStyle]}>{status}</Text>
        <Text style={styles.activityTime}>
          {type} | {displayTime}
        </Text>
      </View>
      <View>
        <Text style={styles.sentAmount}>
          {currencySymbol}
          {sentAmount}
        </Text>
      </View>
    </View>
  );
};

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
  activityContent: {
    marginLeft: 10,
    flex: 1,
  },
  activityStatus: {
    fontWeight: 'bold',
  },
  activityTime: {
    color: 'grey',
  },
  sentAmount: {
    fontWeight: 'bold',
  },
});

export default ActivityItem;
