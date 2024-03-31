import {StyleSheet, Text, View} from 'react-native';
import {DateTime} from 'luxon';
import TransferIcon from '@assets/svg/Transfer';
import YouExchangedIcon from '@assets/svg/YouExchanged';
import {ActivityItemProps} from './ActivityItemProps';
import {IActivityCardItem} from '@sections/DashBoardSectons/ActivityCard/ActivityCard.types';
import WithdrawIcon from '@assets/svg/Withdraw';

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
        return currencyOrConversion.replace(/\s/g, '')[0];
    }
  })();
  console.log('currency', currency);
  console.log('conversionRate', currencySymbol);

  return (
    <View style={styles.activityItem}>
      {icon}
      <View style={styles.activityContent}>
        <Text style={styles.sentAmount}>
          {currencySymbol}
          {Number(sentAmount).toFixed(2)}
        </Text>
        <Text style={styles.activityTime}>
          {type} | {displayTime}
        </Text>
      </View>
      <View>
        <Text style={[statusStyle]}>{status}</Text>
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
