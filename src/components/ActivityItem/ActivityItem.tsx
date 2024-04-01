import React, {useState} from 'react';
import {Animated, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {DateTime} from 'luxon';
import TransferIcon from '@assets/svg/Transfer';
import YouExchangedIcon from '@assets/svg/YouExchanged';
import WithdrawIcon from '@assets/svg/Withdraw';
import {ActivityItemProps} from './ActivityItemProps';

const ActivityItem: React.FC<ActivityItemProps> = ({
  status,
  'sent amount': sentAmount = '',
  'date and time': dateTime = '',
  'status color': statusColor = '',
  type,
  currency,
  'conversion rate': conversionRate = '',
  toggleBottomTab = () => {},
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalY] = useState(new Animated.Value(300));

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

  const showModal = () => {
    setModalVisible(true);
    Animated.timing(modalY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    toggleBottomTab();
  };

  const hideModal = () => {
    Animated.timing(modalY, {
      toValue: 300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
    toggleBottomTab();
  };

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
        <Pressable style={styles.detailsButton} onPress={() => showModal()}>
          <Text>View Details</Text>
        </Pressable>
      </View>

      <Modal
        animationType="none" // Turn off default modal animation
        transparent={true}
        visible={modalVisible}
        onRequestClose={hideModal}>
        <Pressable style={styles.modalOverlay} onPress={hideModal}>
          <Animated.View
            style={[styles.modalView, {transform: [{translateY: modalY}]}]}>
            <Pressable
              style={styles.modalContent}
              onPress={e => e.stopPropagation()}>
              {/* Modal content */}
              <Text style={styles.modalText}>Activity Details</Text>
              <Text>Status: {status}</Text>
              <Text>Date: {dateTime}</Text>
              <Text>Amount: {sentAmount}</Text>
              <Text>Type: {type}</Text>
              {conversionRate && <Text>Conversion Rate: {conversionRate.replace(/^\s+/, '')}</Text>}
            </Pressable>
          </Animated.View>
        </Pressable>
      </Modal>
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
  detailsButton: {
    marginTop: 5,
    padding: 5,
    borderRadius: 5,
  },
  modalContent: {
    width: '100%',
    padding: 20,
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
    borderRadius: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
});

export default ActivityItem;
